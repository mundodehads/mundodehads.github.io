import { hasExtension, lineNumberAt } from './pattern-matching.mjs';

const RULE = 'more than 2 nested control flow blocks in a template';
const MAXIMUM_CONTROL_FLOW_DEPTH = 2;
const EXPRESSION_START_PATTERN = /\{\{|@[a-z]+\s*\(/g;
const TEMPLATE_TOKEN_PATTERN = /@([a-z]+)\b|\{|\}/g;
const COUNTED_BLOCKS = new Set(['if', 'else', 'for', 'empty', 'switch']);
const UNCOUNTED_BLOCKS = new Set(['case', 'default', 'defer', 'placeholder', 'loading', 'error']);

function findBalancedEnd({ fileContent, startOffset, openCharacter, closeCharacter }) {
  let balance = 0;
  for (let offset = startOffset; offset < fileContent.length; offset += 1) {
    balance += Number(fileContent[offset] === openCharacter) - Number(fileContent[offset] === closeCharacter);
    if (balance === 0) {
      return offset + 1;
    }
  }
  return fileContent.length;
}

function blankExpression(blankedContent, expressionStart) {
  const isInterpolation = expressionStart[0] === '{{';
  const startOffset = expressionStart.index + expressionStart[0].length - 1 - Number(isInterpolation);
  const endOffset = findBalancedEnd({
    fileContent: blankedContent,
    startOffset,
    openCharacter: isInterpolation ? '{' : '(',
    closeCharacter: isInterpolation ? '}' : ')',
  });
  return blankedContent.slice(0, startOffset) + ' '.repeat(endOffset - startOffset) + blankedContent.slice(endOffset);
}

function blankExpressions(fileContent) {
  return [...fileContent.matchAll(EXPRESSION_START_PATTERN)].reduce(blankExpression, fileContent);
}

function currentControlFlowDepth(openBlocks) {
  return openBlocks.filter((isCounted) => isCounted).length;
}

function openBlock(scanState, token) {
  scanState.openBlocks.push(scanState.pendingBlock === 'counted');
  scanState.pendingBlock = 'none';
  if (currentControlFlowDepth(scanState.openBlocks) > MAXIMUM_CONTROL_FLOW_DEPTH) {
    scanState.deepOffsets.push(token.index);
  }
}

function markPendingBlock(scanState, blockName) {
  if (COUNTED_BLOCKS.has(blockName)) {
    scanState.pendingBlock = 'counted';
  }
  if (UNCOUNTED_BLOCKS.has(blockName)) {
    scanState.pendingBlock = 'uncounted';
  }
}

function applyToken(scanState, token) {
  if (token[1]) {
    markPendingBlock(scanState, token[1]);
    return;
  }
  if (token[0] === '{') {
    openBlock(scanState, token);
    return;
  }
  scanState.openBlocks.pop();
}

export const templateDepthCheck = {
  appliesToFile: (projectFile) => hasExtension(projectFile, ['.html']),
  findViolations(projectFile) {
    const fileContent = projectFile.readContent();
    const scanState = { openBlocks: [], pendingBlock: 'none', deepOffsets: [] };
    const scannableContent = blankExpressions(fileContent);
    [...scannableContent.matchAll(TEMPLATE_TOKEN_PATTERN)].forEach((token) => applyToken(scanState, token));
    return scanState.deepOffsets.map((offset) => ({ line: lineNumberAt(fileContent, offset), rule: RULE }));
  },
};
