import quickSortMd from './quicksort.md?raw';
import helpMd from './help.md?raw';
import bindProjectSpaceMd from './bind-project-space.md?raw';
import piplineListMd from './pipeline-list.md?raw';
import formatDateMd from './format-date.md?raw';

export const introPrompt = {
  direction: 'horizontal',
  list: [
    {
      value: 'quickSort',
      label: '帮我写一个快速排序',
      iconConfig: { name: 'icon-info-o', color: '#5e7ce0' },
      desc: '使用 js 实现一个快速排序',
    },
    {
      value: 'helpMd',
      label: '你可以帮我做些什么？',
      iconConfig: { name: 'icon-star', color: 'rgb(255, 215, 0)' },
      desc: '了解当前大模型可以帮你做的事',
    },
    {
      value: 'bindProjectSpace',
      label: '怎么绑定项目空间',
      iconConfig: { name: 'icon-priority', color: '#3ac295' },
      desc: '如何绑定云空间中的项目',
    },
  ],
};

export const guessQuestions = [
  { label: '最近执行流水线列表', value: 'pipelineList' },
  { label: '帮我写一个快速排序', value: 'quickSort' },
  { label: '使用 js 格式化时间', value: 'formatDate' },
];

export const simplePrompt = [
  {
    value: 'quickSort',
    iconConfig: { name: 'icon-info-o', color: '#5e7ce0' },
    label: '帮我写一个快速排序',
  },
  {
    value: 'helpMd',
    iconConfig: { name: 'icon-star', color: 'rgb(255, 215, 0)' },
    label: '你可以帮我做些什么？',
  },
];

export const mockAnswer = {
  quickSort: quickSortMd,
  helpMd: helpMd,
  bindProjectSpace: bindProjectSpaceMd,
  pipelineList: piplineListMd,
  formatDate: formatDateMd,
};
