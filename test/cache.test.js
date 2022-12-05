let {
  LRUCache,
  DoubleQueueCache,
} = require("../build/cache.min.js");

const arr = [
  "石室诗士施氏，嗜狮，誓食十狮。施氏时时适市视狮。十时，适十狮适市。是时，适施氏适市。氏视是十狮，恃矢势，使是十狮逝世。氏拾是十狮尸，适石室。石室湿，氏使侍拭石室。石室拭，氏始试食是十狮尸。食时，始识是十狮尸，实十石狮尸。试释是事",
  "季姬寂，集鸡，鸡即棘鸡。棘鸡饥叽，季姬及箕稷济鸡。鸡既济，跻姬笈，季姬忌，急咭鸡，鸡急，继圾几，季姬急，即籍箕击鸡，箕疾击几伎，伎即齑，鸡叽集几基，季姬急极屐击鸡，鸡既殛，季姬激，即记《季姬击鸡记》",
  "黑化黑灰化肥灰会挥发发灰黑讳为黑灰花会回飞，灰化灰黑化肥灰会挥发发黑灰为讳飞花回化为灰",
  "蒸羊羔、蒸熊掌、蒸鹿尾儿、烧花鸭、烧雏鸡儿、烧子鹅、卤煮咸鸭、酱鸡、腊肉、松花、小肚儿、晾肉、香肠、什锦苏盘、熏鸡、白肚儿、清蒸八宝猪、江米酿鸭子、罐儿野鸡、罐儿鹌鹑、卤什锦、卤子鹅、卤虾、烩虾、炝虾仁儿、山鸡、兔脯、菜蟒--",
  "银鱼、清蒸哈什蚂、烩鸭腰儿、烩鸭条儿、清拌鸭丝儿、黄心管儿、焖白鳝、焖黄鳝、豆豉鲇鱼、锅烧鲇鱼、烀皮甲鱼、锅烧鲤鱼、抓炒鲤鱼--",
  "软炸里脊、软炸鸡、什锦套肠、麻酥油卷儿、熘鲜蘑、熘鱼脯儿、熘鱼片儿、熘鱼肚儿、醋熘肉片儿、熘白蘑、烩三鲜、炒银鱼、烩鳗鱼、清蒸火腿、炒白虾、炝青蛤、炒面鱼、炝芦笋、芙蓉燕菜、炒肝尖儿、南炒肝关儿、油爆肚仁儿、汤爆肚领儿、炒金丝、烩银丝、糖熘饹炸儿--",
  "糖熘荸荠、蜜丝山药、拔丝鲜桃、熘南贝、炒南贝、烩鸭丝、烩散丹、清蒸鸡、黄焖鸡、大炒鸡、熘碎鸡、香酥鸡，炒鸡丁儿、熘鸡块儿、三鲜丁儿、八宝丁儿、清蒸玉兰片、炒虾仁儿、炒腰花儿、炒蹄筋儿--",
  "锅烧海参、锅烧白菜、炸海耳、浇田鸡、桂花翅子、清蒸翅子、炸飞禽、炸葱、炸排骨、烩鸡肠肚儿、烩南荠、盐水肘花儿，拌瓤子、炖吊子、锅烧猪蹄儿、烧鸳鸯、烧百合、烧苹果、酿果藕、酿江米、炒螃蟹",
  "打南边来了个瘸子，担了一挑子茄子，手里拿着个碟子，地下钉着木头橛子。没留神那橛子绊倒了瘸子，弄撒了瘸子的茄子，砸了瘸子的碟子，瘸子毛腰拾茄子。",
  "打北边来了个醉老爷子，腰里掖着个烟袋别子，过来要买瘸子的茄子，瘸子不卖给醉老爷子茄子，老爷子一生气抢了瘸子的茄子，瘸子毛腰捡茄子拾碟子，拔橛子，追老爷子，老爷子一生气，不给瘸子茄子，拿起烟袋别子，也不知是老爷子的烟袋别子打了瘸子的茄子，还是瘸子用橛子打了老爷子烟袋别子。",
  "蜜蜂酿蜂蜜",
  "胡庄有个胡苏夫",
  "石小四，史肖石，一同来到阅览室",
  "吕教练是男教练",
  "上街打醋又买布",
  "鹅要过河，河要渡鹅。不知是鹅过河，还是河渡鹅",
]
function random(){
  return arr[Math.floor(Math.random() * arr.length)]
} 

describe('LRU缓存实验', function() {

  test('lruCache', () => {

    const lru = new LRUCache(5);

    const k0 = lru.set(random())
    lru.set(random())
    const k1 =lru.set(random())
    lru.set(random())
    lru.set(random())
    expect(lru.get(k1)).not.toBeNull();

    lru.set(random());
    lru.set(random());
    expect(lru.get(k1)).not.toBeNull();
    expect(lru.get(k0)).toBeNull();

    lru.set(random())
    lru.set(random())
    lru.set(random())
    lru.set(random())
    lru.set(random())
    expect(lru.get(k1)).toBeNull();

  });

})

describe('双队列缓存实验一', function() {

  test('doubleQueueCache_01', () => {
    const double = new DoubleQueueCache(3,2);

    const k2 = double.set(random())
    double.set(random())
    const k3 = double.set(random())
    double.set(random())
    double.set(random())
    expect(double.get(k3)).not.toBeNull();

    double.set(random());
    double.set(random());
    double.set(random());
    expect(double.get(k3)).not.toBeNull();
    expect(double.get(k2)).toBeNull();

    double.set(random());
    double.set(random());
    double.set(random());
    double.set(random());
    double.set(random());
    expect(double.get(k3)).not.toBeNull();
  });
})


describe('双队列缓存实验二', function() {

  test('doubleQueueCache_02', () => {
    const double2 = new DoubleQueueCache(5,5);

    const k4 = double2.set(random())
    const k5 = double2.set(random())
    const k6 = double2.set(random())
    const k7 = double2.set(random())
    const k8 = double2.set(random())
    const k9 = double2.set(random())
    const k10 = double2.set(random())
    const k11 = double2.set(random())
    const k12 = double2.set(random())
    expect(double2.get(k4)).toBeNull();
    expect(double2.get(k5)).toBeNull();
    expect(double2.get(k6)).toBeNull();
    expect(double2.get(k7)).toBeNull();
    expect(double2.get(k8)).not.toBeNull();
    expect(double2.get(k9)).not.toBeNull();
    expect(double2.get(k10)).not.toBeNull();
    expect(double2.get(k11)).not.toBeNull();
    expect(double2.get(k12)).not.toBeNull();

    const k13 = double2.set(random())
    const k14 = double2.set(random())
    const k15 = double2.set(random())
    const k16 = double2.set(random())
    const k17 = double2.set(random())
    // k13-k17放在前，k8-k12无值；放在后，则有值
    expect(double2.get(k13)).not.toBeNull();
    expect(double2.get(k14)).not.toBeNull();
    expect(double2.get(k15)).not.toBeNull();
    expect(double2.get(k16)).not.toBeNull();
    expect(double2.get(k17)).not.toBeNull();

    expect(double2.get(k8)).toBeNull();
    expect(double2.get(k9)).toBeNull();
    expect(double2.get(k10)).toBeNull();
    expect(double2.get(k11)).toBeNull();
    expect(double2.get(k12)).toBeNull();
  });
})

