let {
  generateUUID,
  splitMultilineText,
  getRandomNumber,
} = require('../build/util.min.js');

describe('工具类方法', function() {

  test('generateUUID', () => {
    expect(generateUUID()).toMatch(/[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[8,9,a,b][0-9a-f]{3}-[0-9a-f]{12}/);
  })
});

describe('工具类方法', function() {

  test('splitMultilineText', () => {

    expect(splitMultilineText("一个在众目睽睽之下，撒的弥天大谎，能瞒多久？美国给出的答案是，18年。2003年，美国以伊拉克持有“大规模杀伤性武器”、“解放”伊拉克人民为由，发起了伊拉克战争。这是人类历史上，首次电视直播的战争，关注度空前。18年来，美军从未彻底离开伊拉克的土地，时至今日，所谓的“化学武器”，仍没有找到。美伊最近的一次会谈中，美国承诺将所余作战部队撤出伊拉克。这场战争，似乎要“不明不白”地结束了。在过去18年，拆穿这个谎言的尝试从未间断，越来越多的美国人也站了出来。一位是2003年参战的美国士兵杰西卡·林奇，她在国会上作证，揭露了美军的谎言。第二位，是美国退役四星上将克拉克，他在2007年接受采访时提到，就连美军的高级军官，都不知道“为什么要打伊拉克”。第三位，是美国现任副总统哈里斯，她在最近的一次讲话中提到，美国过去的战争，其实都是“为石油而战”。谎言背后的真相似乎越来越清晰。从林奇到哈里斯，无论是参与战争的士兵，还是美国军方高层，甚至是和这场战争没有交集的美国领导人，都不愿再为这个谎言粉饰。如今，这个谎言即将走向终点，然而18年前它是缘何而起，这个谎言的代价又是什么？", 'holder', 300, 14)).toMatchObject([
      "一个在众目睽睽之下，撒的弥天大谎，能瞒多久",
      "？美国给出的答案是，18年。2003年，美国以伊",
      "拉克持有“大规模杀伤性武器”、“解放”伊拉克人",
      "民为由，发起了伊拉克战争。这是人类历史上，",
      "首次电视直播的战争，关注度空前。18年来，美",
      "军从未彻底离开伊拉克的土地，时至今日，所谓",
      "的“化学武器”，仍没有找到。美伊最近的一次会",
      "谈中，美国承诺将所余作战部队撤出伊拉克。这",
      "场战争，似乎要“不明不白”地结束了。在过去18",
      "年，拆穿这个谎言的尝试从未间断，越来越多的",
      "美国人也站了出来。一位是2003年参战的美国士",
      "兵杰西卡·林奇，她在国会上作证，揭露了美军的",
      "谎言。第二位，是美国退役四星上将克拉克，他",
      "在2007年接受采访时提到，就连美军的高级军官",
      "，都不知道“为什么要打伊拉克”。第三位，是美",
      "国现任副总统哈里斯，她在最近的一次讲话中提",
      "到，美国过去的战争，其实都是“为石油而战”。",
      "谎言背后的真相似乎越来越清晰。从林奇到哈里",
      "斯，无论是参与战争的士兵，还是美国军方高层",
      "，甚至是和这场战争没有交集的美国领导人，都",
      "不愿再为这个谎言粉饰。如今，这个谎言即将走",
      "向终点，然而18年前它是缘何而起，这个谎言的",
      "代价又是什么？"
    ]);

    expect(splitMultilineText("一个在众目睽睽之下，撒的弥天大谎，能瞒多久？美国给出的答案是，18年。2003年，美国以伊拉克持有“大规模杀伤性武器”、“解放”伊拉克人民为由，发起了伊拉克战争。这是人类历史上，首次电视直播的战争，关注度空前。18年来，美军从未彻底离开伊拉克的土地，时至今日，所谓的“化学武器”，仍没有找到。美伊最近的一次会谈中，美国承诺将所余作战部队撤出伊拉克。这场战争，似乎要“不明不白”地结束了。在过去18年，拆穿这个谎言的尝试从未间断，越来越多的美国人也站了出来。一位是2003年参战的美国士兵杰西卡·林奇，她在国会上作证，揭露了美军的谎言。第二位，是美国退役四星上将克拉克，他在2007年接受采访时提到，就连美军的高级军官，都不知道“为什么要打伊拉克”。第三位，是美国现任副总统哈里斯，她在最近的一次讲话中提到，美国过去的战争，其实都是“为石油而战”。谎言背后的真相似乎越来越清晰。从林奇到哈里斯，无论是参与战争的士兵，还是美国军方高层，甚至是和这场战争没有交集的美国领导人，都不愿再为这个谎言粉饰。如今，这个谎言即将走向终点，然而18年前它是缘何而起，这个谎言的代价又是什么？", 'pixel', 300, 14)).toMatchObject([
      "一个在众目睽睽之下，撒的弥天大谎，能瞒多久？",
      "美国给出的答案是，18年。2003年，美国以伊拉克",
      "持有“大规模杀伤性武器”、“解放”伊拉克人民",
      "为由，发起了伊拉克战争。这是人类历史上，首次",
      "电视直播的战争，关注度空前。18年来，美军从未",
      "彻底离开伊拉克的土地，时至今日，所谓的“化学",
      "武器”，仍没有找到。美伊最近的一次会谈中，美",
      "国承诺将所余作战部队撤出伊拉克。这场战争，似",
      "乎要“不明不白”地结束了。在过去18年，拆穿这",
      "个谎言的尝试从未间断，越来越多的美国人也站了",
      "出来。一位是2003年参战的美国士兵杰西卡·林奇",
      "，她在国会上作证，揭露了美军的谎言。第二位，",
      "是美国退役四星上将克拉克，他在2007年接受采访",
      "时提到，就连美军的高级军官，都不知道“为什么",
      "要打伊拉克”。第三位，是美国现任副总统哈里斯",
      "，她在最近的一次讲话中提到，美国过去的战争，",
      "其实都是“为石油而战”。谎言背后的真相似乎越",
      "来越清晰。从林奇到哈里斯，无论是参与战争的士",
      "兵，还是美国军方高层，甚至是和这场战争没有交",
      "集的美国领导人，都不愿再为这个谎言粉饰。如今",
      "，这个谎言即将走向终点，然而18年前它是缘何而",
      "起，这个谎言的代价又是什么？",
    ]);
  })
});

describe('工具类方法', () => {
  
  test('getRandomNumber', ()=>{
    expect(()=>{getRandomNumber(100)}).toThrow(new Error('range参数必须是一个数组'));
    expect(()=>{getRandomNumber(['a'])}).toThrow(new Error('range参数的第一个元素不是一个有效的数值'));
    expect(()=>{getRandomNumber([50, 'b'])}).toThrow(new Error('range参数的第二个元素不是一个有效的数值'));
    
    const mockFn1 = jest.fn(() => getRandomNumber([50]))
    mockFn1();
    expect(mockFn1).toHaveReturned();
    
    const mockFn2 = jest.fn(() => getRandomNumber([50, 100]))
    mockFn2();
    expect(mockFn2).toHaveReturned();
  })
});
