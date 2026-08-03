// =============================================================================
// WORDS — Vietnamese vocabulary
// Format: {id, tier, vn, north, en, category, example_vn, example_en}
//   tier:   1 = free starter | 2+ = unlocked via shop
//   north:  Northern variant if different from Southern (vn field), else null
//   category: greetings | verbs | adjectives | nouns | food | family |
//             numbers | time | colors | places | prepositions
//
// ── ADD YOUR OWN WORDS BELOW (copy any line as template) ─────────────────
// {id:'custom_01', tier:2, vn:'...', north:null, en:'...', category:'food',
//  example_vn:'...', example_en:'...'},
// ─────────────────────────────────────────────────────────────────────────
// =============================================================================
const WORDS = [
  // GREETINGS
  {id:'g001',tier:1,vn:'Xin chào',north:null,en:'Hello',category:'greetings',example_vn:'Xin chào! Bạn khỏe không?',example_en:'Hello! How are you?'},
  {id:'g002',tier:2,vn:'Chào',north:null,en:'Hi (informal)',category:'greetings',example_vn:'Chào bạn!',example_en:'Hi!'},
  {id:'g003',tier:1,vn:'Tạm biệt',north:null,en:'Goodbye',category:'greetings',example_vn:'Tạm biệt, hẹn gặp lại!',example_en:'Goodbye, see you later!'},
  {id:'g004',tier:1,vn:'Cảm ơn',north:null,en:'Thank you',category:'greetings',example_vn:'Cảm ơn bạn rất nhiều!',example_en:'Thank you very much!'},
  {id:'g005',tier:1,vn:'Xin lỗi',north:null,en:'Sorry / Excuse me',category:'greetings',example_vn:'Xin lỗi, tôi không hiểu.',example_en:"Sorry, I don't understand."},
  {id:'g006',tier:2,vn:'Làm ơn',north:null,en:'Please',category:'greetings',example_vn:'Làm ơn cho tôi một ly nước.',example_en:'Please give me a glass of water.'},
  {id:'g007',tier:1,vn:'Bạn khỏe không?',north:null,en:'How are you?',category:'greetings',example_vn:'Bạn khỏe không? Tôi khỏe.',example_en:"How are you? I'm fine."},
  {id:'g008',tier:2,vn:'Rất vui được gặp bạn',north:null,en:'Nice to meet you',category:'greetings',example_vn:'Rất vui được gặp bạn hôm nay.',example_en:'Very nice to meet you today.'},
  {id:'g009',tier:1,vn:'Không có gì',north:null,en:"You're welcome",category:'greetings',example_vn:'Cảm ơn! — Không có gì.',example_en:"Thank you! — You're welcome."},
  {id:'g010',tier:1,vn:'Dạ',north:'Vâng',en:'Yes (polite)',category:'greetings',example_vn:'Dạ, tôi hiểu rồi.',example_en:'Yes, I understand.'},
  {id:'g011',tier:1,vn:'Không',north:null,en:'No',category:'greetings',example_vn:'Không, tôi không muốn.',example_en:"No, I don't want to."},
  {id:'g012',tier:2,vn:'Chào buổi sáng',north:null,en:'Good morning',category:'greetings',example_vn:'Chào buổi sáng! Hôm nay đẹp trời.',example_en:"Good morning! It's a nice day."},
  {id:'g013',tier:2,vn:'Chào buổi tối',north:null,en:'Good evening',category:'greetings',example_vn:'Chào buổi tối! Bạn ăn cơm chưa?',example_en:'Good evening! Have you eaten yet?'},
  {id:'g014',tier:2,vn:'Chúc ngủ ngon',north:null,en:'Good night',category:'greetings',example_vn:'Chúc ngủ ngon nhé!',example_en:'Have a good night!'},
  {id:'g015',tier:2,vn:'Tên tôi là...',north:null,en:'My name is...',category:'greetings',example_vn:'Tên tôi là Minh.',example_en:'My name is Minh.'},
  {id:'g016',tier:2,vn:'Bạn tên gì?',north:null,en:'What is your name?',category:'greetings',example_vn:'Bạn tên gì? Tôi tên là Lan.',example_en:'What is your name? My name is Lan.'},
  {id:'g017',tier:2,vn:'Hẹn gặp lại',north:null,en:'See you again',category:'greetings',example_vn:'Hẹn gặp lại ngày mai!',example_en:'See you again tomorrow!'},
  {id:'g018',tier:2,vn:'Chúc mừng',north:null,en:'Congratulations',category:'greetings',example_vn:'Chúc mừng sinh nhật bạn!',example_en:'Happy birthday!'},
  {id:'g019',tier:2,vn:'Không sao',north:null,en:"It's okay / No problem",category:'greetings',example_vn:'Không sao, đừng lo.',example_en:"It's okay, don't worry."},
  {id:'g020',tier:2,vn:'Xin chào mừng',north:null,en:'Welcome',category:'greetings',example_vn:'Xin chào mừng đến Việt Nam!',example_en:'Welcome to Vietnam!'},

  // VERBS
  {id:'v001',tier:1,vn:'ăn',north:null,en:'to eat',category:'verbs',example_vn:'Tôi ăn cơm mỗi ngày.',example_en:'I eat rice every day.'},
  {id:'v002',tier:1,vn:'uống',north:null,en:'to drink',category:'verbs',example_vn:'Bạn uống gì?',example_en:'What do you drink?'},
  {id:'v003',tier:2,vn:'ngủ',north:null,en:'to sleep',category:'verbs',example_vn:'Tôi ngủ lúc 10 giờ tối.',example_en:'I sleep at 10 PM.'},
  {id:'v004',tier:1,vn:'đi',north:null,en:'to go',category:'verbs',example_vn:'Tôi đi học mỗi sáng.',example_en:'I go to school every morning.'},
  {id:'v005',tier:2,vn:'đến',north:null,en:'to arrive / come',category:'verbs',example_vn:'Anh ấy đến lúc 8 giờ.',example_en:'He arrives at 8 o\'clock.'},
  {id:'v006',tier:2,vn:'về',north:null,en:'to return / go home',category:'verbs',example_vn:'Tôi về nhà lúc 6 giờ chiều.',example_en:'I go home at 6 PM.'},
  {id:'v007',tier:2,vn:'học',north:null,en:'to study / learn',category:'verbs',example_vn:'Tôi đang học tiếng Việt.',example_en:'I am studying Vietnamese.'},
  {id:'v008',tier:2,vn:'đọc',north:null,en:'to read',category:'verbs',example_vn:'Cô ấy đọc sách mỗi tối.',example_en:'She reads books every evening.'},
  {id:'v009',tier:2,vn:'viết',north:null,en:'to write',category:'verbs',example_vn:'Tôi viết thư cho bạn.',example_en:'I write a letter to you.'},
  {id:'v010',tier:2,vn:'nói',north:null,en:'to speak / say',category:'verbs',example_vn:'Bạn có thể nói chậm hơn không?',example_en:'Can you speak more slowly?'},
  {id:'v011',tier:2,vn:'nghe',north:null,en:'to listen / hear',category:'verbs',example_vn:'Tôi nghe nhạc mỗi ngày.',example_en:'I listen to music every day.'},
  {id:'v012',tier:2,vn:'nhìn',north:null,en:'to look / see',category:'verbs',example_vn:'Nhìn kìa, có con chim!',example_en:"Look, there's a bird!"},
  {id:'v013',tier:2,vn:'mua',north:null,en:'to buy',category:'verbs',example_vn:'Tôi muốn mua áo này.',example_en:'I want to buy this shirt.'},
  {id:'v014',tier:3,vn:'bán',north:null,en:'to sell',category:'verbs',example_vn:'Cửa hàng đó bán nhiều thứ.',example_en:'That store sells many things.'},
  {id:'v015',tier:1,vn:'muốn',north:null,en:'to want',category:'verbs',example_vn:'Tôi muốn ăn phở.',example_en:'I want to eat pho.'},
  {id:'v016',tier:3,vn:'cần',north:null,en:'to need',category:'verbs',example_vn:'Tôi cần giúp đỡ.',example_en:'I need help.'},
  {id:'v017',tier:3,vn:'thích',north:null,en:'to like',category:'verbs',example_vn:'Tôi thích ăn đồ chua.',example_en:'I like eating sour food.'},
  {id:'v018',tier:3,vn:'yêu',north:null,en:'to love',category:'verbs',example_vn:'Tôi yêu gia đình tôi.',example_en:'I love my family.'},
  {id:'v019',tier:3,vn:'biết',north:null,en:'to know (fact/skill)',category:'verbs',example_vn:'Bạn có biết đường không?',example_en:'Do you know the way?'},
  {id:'v020',tier:1,vn:'hiểu',north:null,en:'to understand',category:'verbs',example_vn:'Tôi không hiểu câu này.',example_en:"I don't understand this sentence."},
  {id:'v021',tier:3,vn:'nhớ',north:null,en:'to remember / miss',category:'verbs',example_vn:'Tôi nhớ bạn rất nhiều.',example_en:'I miss you very much.'},
  {id:'v022',tier:3,vn:'quên',north:null,en:'to forget',category:'verbs',example_vn:'Tôi quên mang chìa khóa rồi.',example_en:'I forgot to bring the key.'},
  {id:'v023',tier:3,vn:'gặp',north:null,en:'to meet',category:'verbs',example_vn:'Tôi gặp bạn ở công viên.',example_en:'I met you at the park.'},
  {id:'v024',tier:3,vn:'hỏi',north:null,en:'to ask',category:'verbs',example_vn:'Tôi muốn hỏi bạn một câu.',example_en:'I want to ask you something.'},
  {id:'v025',tier:3,vn:'trả lời',north:null,en:'to answer / reply',category:'verbs',example_vn:'Bạn có thể trả lời không?',example_en:'Can you answer?'},
  {id:'v026',tier:4,vn:'giúp',north:null,en:'to help',category:'verbs',example_vn:'Bạn có thể giúp tôi không?',example_en:'Can you help me?'},
  {id:'v027',tier:4,vn:'cho',north:null,en:'to give',category:'verbs',example_vn:'Anh ấy cho tôi một quyển sách.',example_en:'He gave me a book.'},
  {id:'v028',tier:4,vn:'lấy',north:null,en:'to take / get',category:'verbs',example_vn:'Lấy cho tôi cái kia được không?',example_en:'Can you get that for me?'},
  {id:'v029',tier:4,vn:'mang',north:null,en:'to bring / carry',category:'verbs',example_vn:'Bạn mang đồ cho tôi nhé.',example_en:'Please bring my things.'},
  {id:'v030',tier:4,vn:'mở',north:null,en:'to open',category:'verbs',example_vn:'Mở cửa ra cho tôi đi.',example_en:'Open the door for me.'},
  {id:'v031',tier:4,vn:'đóng',north:null,en:'to close',category:'verbs',example_vn:"Đóng cửa sổ lại đi, lạnh lắm.",example_en:"Close the window, it's cold."},
  {id:'v032',tier:4,vn:'bắt đầu',north:null,en:'to start / begin',category:'verbs',example_vn:'Chúng ta bắt đầu học thôi.',example_en:"Let's start studying."},
  {id:'v033',tier:4,vn:'kết thúc',north:null,en:'to end / finish',category:'verbs',example_vn:'Phim kết thúc lúc mấy giờ?',example_en:'What time does the movie end?'},
  {id:'v034',tier:4,vn:'chờ',north:null,en:'to wait',category:'verbs',example_vn:'Chờ tôi một chút nhé.',example_en:'Wait for me a moment.'},
  {id:'v035',tier:4,vn:'ngồi',north:null,en:'to sit',category:'verbs',example_vn:'Mời bạn ngồi xuống.',example_en:'Please sit down.'},
  {id:'v036',tier:5,vn:'đứng',north:null,en:'to stand',category:'verbs',example_vn:'Tôi đứng ở đây chờ bạn.',example_en:'I am standing here waiting for you.'},
  {id:'v037',tier:5,vn:'chạy',north:null,en:'to run',category:'verbs',example_vn:'Anh ấy chạy rất nhanh.',example_en:'He runs very fast.'},
  {id:'v038',tier:5,vn:'đi bộ',north:null,en:'to walk',category:'verbs',example_vn:'Tôi đi bộ đến chợ.',example_en:'I walk to the market.'},
  {id:'v039',tier:5,vn:'lái',north:null,en:'to drive',category:'verbs',example_vn:'Bạn có biết lái xe không?',example_en:'Do you know how to drive?'},
  {id:'v040',tier:5,vn:'nấu',north:null,en:'to cook',category:'verbs',example_vn:'Mẹ nấu cơm rất ngon.',example_en:'Mom cooks rice very deliciously.'},
  {id:'v041',tier:5,vn:'dọn dẹp',north:null,en:'to clean up',category:'verbs',example_vn:'Tôi dọn dẹp nhà mỗi cuối tuần.',example_en:'I clean the house every weekend.'},
  {id:'v042',tier:5,vn:'gọi điện',north:null,en:'to call (phone)',category:'verbs',example_vn:'Tôi sẽ gọi điện cho bạn sau.',example_en:'I will call you later.'},
  {id:'v043',tier:5,vn:'nhắn tin',north:null,en:'to text / message',category:'verbs',example_vn:'Bạn nhắn tin cho tôi nhé.',example_en:'Text me please.'},
  {id:'v044',tier:5,vn:'trả tiền',north:null,en:'to pay',category:'verbs',example_vn:'Tôi trả tiền cho bữa ăn này.',example_en:'I will pay for this meal.'},
  {id:'v045',tier:5,vn:'đặt',north:null,en:'to book / order',category:'verbs',example_vn:'Tôi đặt bàn ở nhà hàng rồi.',example_en:'I already booked a table.'},
  {id:'v046',tier:6,vn:'làm việc',north:null,en:'to work',category:'verbs',example_vn:'Tôi làm việc từ 8 giờ sáng.',example_en:'I work from 8 AM.'},
  {id:'v047',tier:6,vn:'thức dậy',north:null,en:'to wake up',category:'verbs',example_vn:'Tôi thức dậy lúc 6 giờ sáng.',example_en:'I wake up at 6 AM.'},
  {id:'v048',tier:6,vn:'giặt',north:null,en:'to wash (clothes)',category:'verbs',example_vn:'Tôi giặt quần áo hôm nay.',example_en:'I wash clothes today.'},
  {id:'v049',tier:6,vn:'xem',north:null,en:'to watch / look at',category:'verbs',example_vn:'Tôi xem phim tối qua.',example_en:'I watched a movie last night.'},
  {id:'v050',tier:1,vn:'là',north:null,en:'to be (identity)',category:'verbs',example_vn:'Tôi là học sinh.',example_en:'I am a student.'},

  // ADJECTIVES
  {id:'a001',tier:1,vn:'tốt',north:null,en:'good',category:'adjectives',example_vn:'Anh ấy là người tốt.',example_en:'He is a good person.'},
  {id:'a002',tier:2,vn:'xấu',north:null,en:'bad / ugly',category:'adjectives',example_vn:'Thời tiết hôm nay rất xấu.',example_en:'The weather today is very bad.'},
  {id:'a003',tier:2,vn:'đẹp',north:null,en:'beautiful / pretty',category:'adjectives',example_vn:'Hoa này rất đẹp.',example_en:'These flowers are very beautiful.'},
  {id:'a004',tier:1,vn:'lớn',north:null,en:'big / large',category:'adjectives',example_vn:'Thành phố này rất lớn.',example_en:'This city is very large.'},
  {id:'a005',tier:2,vn:'nhỏ',north:null,en:'small / little',category:'adjectives',example_vn:'Con mèo này nhỏ quá.',example_en:'This cat is so small.'},
  {id:'a006',tier:2,vn:'cao',north:null,en:'tall / high',category:'adjectives',example_vn:'Anh ấy rất cao.',example_en:'He is very tall.'},
  {id:'a007',tier:2,vn:'thấp',north:null,en:'short / low',category:'adjectives',example_vn:'Cái ghế này hơi thấp.',example_en:'This chair is a bit low.'},
  {id:'a008',tier:3,vn:'dài',north:null,en:'long',category:'adjectives',example_vn:'Con đường này rất dài.',example_en:'This road is very long.'},
  {id:'a009',tier:3,vn:'ngắn',north:null,en:'short (length)',category:'adjectives',example_vn:'Chiếc áo này hơi ngắn.',example_en:'This shirt is a bit short.'},
  {id:'a010',tier:3,vn:'nặng',north:null,en:'heavy',category:'adjectives',example_vn:'Cái túi này nặng lắm.',example_en:'This bag is very heavy.'},
  {id:'a011',tier:3,vn:'nhẹ',north:null,en:'light (weight)',category:'adjectives',example_vn:'Chiếc điện thoại mới này rất nhẹ.',example_en:'This new phone is very light.'},
  {id:'a012',tier:2,vn:'nhanh',north:null,en:'fast / quick',category:'adjectives',example_vn:'Xe này chạy rất nhanh.',example_en:'This car drives very fast.'},
  {id:'a013',tier:2,vn:'chậm',north:null,en:'slow',category:'adjectives',example_vn:'Internet ở đây chậm quá.',example_en:'The internet here is so slow.'},
  {id:'a014',tier:1,vn:'nóng',north:null,en:'hot',category:'adjectives',example_vn:'Hôm nay trời nóng lắm.',example_en:'Today is very hot.'},
  {id:'a015',tier:2,vn:'lạnh',north:null,en:'cold',category:'adjectives',example_vn:'Nước lạnh này ngon quá.',example_en:'This cold water is so refreshing.'},
  {id:'a016',tier:3,vn:'ấm',north:null,en:'warm',category:'adjectives',example_vn:'Thời tiết hôm nay ấm áp.',example_en:'The weather today is warm.'},
  {id:'a017',tier:3,vn:'mát',north:null,en:'cool / refreshing',category:'adjectives',example_vn:'Buổi sáng rất mát mẻ.',example_en:'The morning is very cool.'},
  {id:'a018',tier:1,vn:'ngon',north:null,en:'delicious / tasty',category:'adjectives',example_vn:'Phở này ngon lắm!',example_en:'This pho is so delicious!'},
  {id:'a019',tier:2,vn:'đắt',north:null,en:'expensive',category:'adjectives',example_vn:'Cái áo này đắt quá.',example_en:'This shirt is too expensive.'},
  {id:'a020',tier:2,vn:'rẻ',north:null,en:'cheap / inexpensive',category:'adjectives',example_vn:'Đồ ăn ở đây rất rẻ.',example_en:'Food here is very cheap.'},
  {id:'a021',tier:3,vn:'mới',north:null,en:'new',category:'adjectives',example_vn:'Tôi mua xe máy mới rồi.',example_en:'I already bought a new motorbike.'},
  {id:'a022',tier:3,vn:'cũ',north:null,en:'old / used',category:'adjectives',example_vn:'Quyển sách này cũ lắm.',example_en:'This book is very old.'},
  {id:'a023',tier:3,vn:'trẻ',north:null,en:'young',category:'adjectives',example_vn:'Cô ấy trông rất trẻ.',example_en:'She looks very young.'},
  {id:'a024',tier:3,vn:'già',north:null,en:'old (person)',category:'adjectives',example_vn:'Ông ấy đã già nhưng vẫn khỏe.',example_en:'He is old but still healthy.'},
  {id:'a025',tier:4,vn:'khỏe',north:null,en:'healthy / well',category:'adjectives',example_vn:'Tôi cảm thấy rất khỏe hôm nay.',example_en:'I feel very healthy today.'},
  {id:'a026',tier:4,vn:'mệt',north:null,en:'tired',category:'adjectives',example_vn:'Tôi mệt quá, cần nghỉ ngơi.',example_en:'I am so tired, I need to rest.'},
  {id:'a027',tier:4,vn:'đói',north:null,en:'hungry',category:'adjectives',example_vn:"Tôi đói bụng rồi, ăn gì đi.",example_en:"I'm hungry, let's eat something."},
  {id:'a028',tier:4,vn:'no',north:null,en:'full (after eating)',category:'adjectives',example_vn:'Cảm ơn, tôi ăn no rồi.',example_en:"Thanks, I'm full already."},
  {id:'a029',tier:4,vn:'khát',north:null,en:'thirsty',category:'adjectives',example_vn:'Trời nóng nên tôi rất khát.',example_en:"It's hot so I'm very thirsty."},
  {id:'a030',tier:4,vn:'vui',north:null,en:'happy / glad',category:'adjectives',example_vn:'Tôi rất vui khi gặp bạn.',example_en:'I am very happy to see you.'},
  {id:'a031',tier:4,vn:'buồn',north:null,en:'sad',category:'adjectives',example_vn:'Cô ấy buồn vì mất chú mèo.',example_en:'She is sad because she lost her cat.'},
  {id:'a032',tier:4,vn:'tức',north:null,en:'angry',category:'adjectives',example_vn:'Đừng tức như vậy, bình tĩnh thôi.',example_en:"Don't be so angry, calm down."},
  {id:'a033',tier:4,vn:'sợ',north:null,en:'scared / afraid',category:'adjectives',example_vn:'Tôi sợ bóng tối.',example_en:'I am afraid of the dark.'},
  {id:'a034',tier:4,vn:'khó',north:null,en:'difficult / hard',category:'adjectives',example_vn:'Bài này khó quá.',example_en:'This lesson is too difficult.'},
  {id:'a035',tier:5,vn:'dễ',north:null,en:'easy',category:'adjectives',example_vn:'Tiếng Việt không dễ nhưng cũng không khó.',example_en:'Vietnamese is not easy but not hard either.'},
  {id:'a036',tier:5,vn:'nhiều',north:null,en:'many / much / a lot',category:'adjectives',example_vn:'Tôi có nhiều bạn bè.',example_en:'I have many friends.'},
  {id:'a037',tier:5,vn:'ít',north:null,en:'few / little',category:'adjectives',example_vn:'Còn ít tiền thôi.',example_en:'There is only a little money left.'},
  {id:'a038',tier:5,vn:'đủ',north:null,en:'enough',category:'adjectives',example_vn:'Tiền đủ để mua rồi.',example_en:'There is enough money to buy it.'},
  {id:'a039',tier:5,vn:'đẹp trai',north:null,en:'handsome',category:'adjectives',example_vn:'Anh ấy rất đẹp trai.',example_en:'He is very handsome.'},
  {id:'a040',tier:5,vn:'xinh',north:null,en:'cute / pretty',category:'adjectives',example_vn:'Em bé này xinh quá!',example_en:'This baby is so cute!'},

  // NOUNS
  {id:'n001',tier:2,vn:'nhà',north:null,en:'house / home',category:'nouns',example_vn:'Nhà tôi ở gần đây.',example_en:'My house is nearby.'},
  {id:'n002',tier:2,vn:'phòng',north:null,en:'room',category:'nouns',example_vn:'Phòng tôi rất nhỏ.',example_en:'My room is very small.'},
  {id:'n003',tier:2,vn:'cửa',north:null,en:'door',category:'nouns',example_vn:'Đóng cửa lại đi.',example_en:'Close the door.'},
  {id:'n004',tier:2,vn:'bàn',north:null,en:'table / desk',category:'nouns',example_vn:'Sách ở trên bàn.',example_en:'The book is on the table.'},
  {id:'n005',tier:2,vn:'ghế',north:null,en:'chair',category:'nouns',example_vn:'Ngồi vào ghế đi.',example_en:'Sit in the chair.'},
  {id:'n006',tier:2,vn:'giường',north:null,en:'bed',category:'nouns',example_vn:'Tôi ngủ trên giường.',example_en:'I sleep on the bed.'},
  {id:'n007',tier:2,vn:'sách',north:null,en:'book',category:'nouns',example_vn:'Tôi đọc sách mỗi tối.',example_en:'I read a book every evening.'},
  {id:'n008',tier:2,vn:'bút',north:null,en:'pen',category:'nouns',example_vn:'Cho tôi mượn cái bút.',example_en:'Let me borrow a pen.'},
  {id:'n009',tier:2,vn:'điện thoại',north:null,en:'phone',category:'nouns',example_vn:'Điện thoại tôi hết pin rồi.',example_en:'My phone is out of battery.'},
  {id:'n010',tier:2,vn:'máy tính',north:null,en:'computer',category:'nouns',example_vn:'Tôi làm việc trên máy tính.',example_en:'I work on the computer.'},
  {id:'n011',tier:3,vn:'xe máy',north:null,en:'motorbike',category:'nouns',example_vn:'Tôi đi xe máy đến chợ.',example_en:'I ride a motorbike to the market.'},
  {id:'n012',tier:3,vn:'ô tô',north:'xe hơi',en:'car',category:'nouns',example_vn:'Anh ấy lái ô tô đi làm.',example_en:'He drives a car to work.'},
  {id:'n013',tier:3,vn:'đường',north:null,en:'road / street',category:'nouns',example_vn:'Con đường này rất đông xe.',example_en:'This road is very busy.'},
  {id:'n014',tier:3,vn:'chợ',north:null,en:'market',category:'nouns',example_vn:'Mẹ đi chợ mua rau.',example_en:'Mom goes to the market to buy vegetables.'},
  {id:'n015',tier:3,vn:'cửa hàng',north:null,en:'shop / store',category:'nouns',example_vn:'Cửa hàng đó mở cửa lúc 8 giờ.',example_en:"That store opens at 8 o'clock."},
  {id:'n016',tier:3,vn:'tiền',north:null,en:'money',category:'nouns',example_vn:'Bao nhiêu tiền?',example_en:'How much money?'},
  {id:'n017',tier:3,vn:'túi',north:null,en:'bag / pocket',category:'nouns',example_vn:'Túi tôi bị mất rồi.',example_en:'My bag is lost.'},
  {id:'n018',tier:3,vn:'quần',north:null,en:'pants / trousers',category:'nouns',example_vn:'Tôi mặc quần xanh hôm nay.',example_en:'I am wearing blue pants today.'},
  {id:'n019',tier:3,vn:'áo',north:null,en:'shirt / top',category:'nouns',example_vn:'Chiếc áo này đẹp lắm.',example_en:'This shirt is very nice.'},
  {id:'n020',tier:3,vn:'giày',north:null,en:'shoes',category:'nouns',example_vn:'Đôi giày mới của tôi rất thoải mái.',example_en:'My new shoes are very comfortable.'},
  {id:'n021',tier:4,vn:'nước',north:null,en:'water',category:'nouns',example_vn:'Cho tôi một ly nước.',example_en:'Give me a glass of water.'},
  {id:'n022',tier:4,vn:'cơm',north:null,en:'cooked rice / meal',category:'nouns',example_vn:'Cơm trưa đã sẵn sàng chưa?',example_en:'Is lunch ready yet?'},
  {id:'n023',tier:4,vn:'bánh mì',north:null,en:'bread / baguette',category:'nouns',example_vn:'Tôi ăn bánh mì vào buổi sáng.',example_en:'I eat a baguette in the morning.'},
  {id:'n024',tier:4,vn:'trứng',north:null,en:'egg',category:'nouns',example_vn:'Tôi ăn hai quả trứng mỗi sáng.',example_en:'I eat two eggs every morning.'},
  {id:'n025',tier:4,vn:'thịt',north:null,en:'meat',category:'nouns',example_vn:'Bạn thích ăn thịt gì?',example_en:'What kind of meat do you like?'},
  {id:'n026',tier:4,vn:'rau',north:null,en:'vegetables',category:'nouns',example_vn:'Ăn nhiều rau tốt cho sức khỏe.',example_en:'Eating lots of vegetables is good for health.'},
  {id:'n027',tier:4,vn:'hoa quả',north:'trái cây',en:'fruit',category:'nouns',example_vn:'Tôi thích ăn hoa quả nhiệt đới.',example_en:'I like eating tropical fruit.'},
  {id:'n028',tier:4,vn:'đồ uống',north:null,en:'drinks / beverages',category:'nouns',example_vn:'Đồ uống yêu thích của bạn là gì?',example_en:'What is your favorite drink?'},
  {id:'n029',tier:4,vn:'cửa sổ',north:null,en:'window',category:'nouns',example_vn:'Mở cửa sổ ra cho thoáng.',example_en:'Open the window for ventilation.'},
  {id:'n030',tier:4,vn:'chìa khóa',north:null,en:'key',category:'nouns',example_vn:'Tôi quên chìa khóa ở nhà rồi.',example_en:'I forgot the key at home.'},

  // FOOD
  {id:'f001',tier:1,vn:'phở',north:null,en:'pho (noodle soup)',category:'food',example_vn:'Phở là món ăn nổi tiếng của Việt Nam.',example_en:'Pho is a famous Vietnamese dish.'},
  {id:'f002',tier:2,vn:'phở bò',north:null,en:'beef pho',category:'food',example_vn:'Tôi muốn ăn một tô phở bò.',example_en:'I want to eat a bowl of beef pho.'},
  {id:'f003',tier:2,vn:'phở gà',north:null,en:'chicken pho',category:'food',example_vn:'Phở gà nhẹ hơn phở bò.',example_en:'Chicken pho is lighter than beef pho.'},
  {id:'f004',tier:3,vn:'bún bò Huế',north:null,en:'Hue spicy beef noodle soup',category:'food',example_vn:'Bún bò Huế cay và thơm lắm.',example_en:'Hue beef noodle soup is spicy and fragrant.'},
  {id:'f005',tier:3,vn:'bún chả',north:null,en:'grilled pork with noodles',category:'food',example_vn:'Bún chả là món ăn đặc trưng của Hà Nội.',example_en:'Bun cha is a signature dish of Hanoi.'},
  {id:'f006',tier:2,vn:'cơm tấm',north:null,en:'broken rice with grilled pork',category:'food',example_vn:'Cơm tấm là món ăn sáng phổ biến ở Sài Gòn.',example_en:'Broken rice is a popular breakfast in Saigon.'},
  {id:'f007',tier:2,vn:'bánh xèo',north:null,en:'sizzling crepe',category:'food',example_vn:'Bánh xèo ăn với rau sống rất ngon.',example_en:'Sizzling crepes are delicious with fresh vegetables.'},
  {id:'f008',tier:3,vn:'gỏi cuốn',north:null,en:'fresh spring rolls',category:'food',example_vn:'Gỏi cuốn tôm thịt nhúng nước mắm.',example_en:'Shrimp and pork spring rolls dipped in fish sauce.'},
  {id:'f009',tier:3,vn:'chả giò',north:'nem rán',en:'fried spring rolls',category:'food',example_vn:'Chả giò giòn và ngon lắm.',example_en:'Fried spring rolls are crispy and delicious.'},
  {id:'f010',tier:3,vn:'cơm chiên',north:null,en:'fried rice',category:'food',example_vn:'Cơm chiên dương châu rất phổ biến.',example_en:'Yang Chow fried rice is very popular.'},
  {id:'f011',tier:3,vn:'lẩu',north:null,en:'hotpot',category:'food',example_vn:'Chúng tôi ăn lẩu cùng nhau.',example_en:'We eat hotpot together.'},
  {id:'f012',tier:3,vn:'thịt bò',north:null,en:'beef',category:'food',example_vn:'Thịt bò nướng thơm lắm.',example_en:'Grilled beef smells wonderful.'},
  {id:'f013',tier:3,vn:'thịt gà',north:null,en:'chicken (meat)',category:'food',example_vn:'Thịt gà luộc ăn với cơm trắng.',example_en:'Boiled chicken eaten with white rice.'},
  {id:'f014',tier:3,vn:'thịt heo',north:'thịt lợn',en:'pork',category:'food',example_vn:'Thịt heo kho trứng rất đậm đà.',example_en:'Braised pork with eggs is very flavorful.'},
  {id:'f015',tier:3,vn:'tôm',north:null,en:'shrimp / prawn',category:'food',example_vn:'Tôm nướng muối ớt rất ngon.',example_en:'Grilled shrimp with salt and chili is delicious.'},
  {id:'f016',tier:4,vn:'cá',north:null,en:'fish',category:'food',example_vn:'Cá kho tộ là món ăn truyền thống.',example_en:'Braised fish in clay pot is a traditional dish.'},
  {id:'f017',tier:4,vn:'mực',north:null,en:'squid',category:'food',example_vn:'Mực xào cần tây rất thơm.',example_en:'Stir-fried squid with celery is fragrant.'},
  {id:'f018',tier:4,vn:'cua',north:null,en:'crab',category:'food',example_vn:'Cua rang muối là món hải sản yêu thích.',example_en:'Salt-roasted crab is a favorite seafood dish.'},
  {id:'f019',tier:4,vn:'đậu phụ',north:null,en:'tofu',category:'food',example_vn:'Đậu phụ chiên vàng giòn rất ngon.',example_en:'Crispy golden fried tofu is delicious.'},
  {id:'f020',tier:4,vn:'rau muống',north:null,en:'water spinach',category:'food',example_vn:'Rau muống xào tỏi thơm lắm.',example_en:'Water spinach stir-fried with garlic is fragrant.'},
  {id:'f021',tier:4,vn:'giá',north:null,en:'bean sprouts',category:'food',example_vn:'Ăn phở phải có giá và rau thơm.',example_en:'Eating pho must have bean sprouts and herbs.'},
  {id:'f022',tier:2,vn:'trà',north:null,en:'tea',category:'food',example_vn:'Uống trà xanh tốt cho sức khỏe.',example_en:'Drinking green tea is good for health.'},
  {id:'f023',tier:2,vn:'trà đá',north:null,en:'iced tea',category:'food',example_vn:'Trà đá miễn phí ở quán cơm bình dân.',example_en:'Iced tea is free at cheap rice restaurants.'},
  {id:'f024',tier:1,vn:'cà phê',north:null,en:'coffee',category:'food',example_vn:'Cà phê Việt Nam rất đậm và ngon.',example_en:'Vietnamese coffee is very strong and delicious.'},
  {id:'f025',tier:2,vn:'cà phê sữa đá',north:null,en:'iced milk coffee',category:'food',example_vn:'Cà phê sữa đá là thức uống quốc dân.',example_en:'Iced milk coffee is the national drink.'},
  {id:'f026',tier:4,vn:'sinh tố',north:null,en:'smoothie / fruit shake',category:'food',example_vn:'Sinh tố xoài rất thơm và ngọt.',example_en:'Mango smoothie is very fragrant and sweet.'},
  {id:'f027',tier:2,vn:'nước dừa',north:null,en:'coconut water',category:'food',example_vn:'Nước dừa tươi mát và ngọt.',example_en:'Fresh coconut water is cool and sweet.'},
  {id:'f028',tier:4,vn:'nước mía',north:null,en:'sugarcane juice',category:'food',example_vn:'Nước mía uống mát lắm ngày hè.',example_en:'Sugarcane juice is very refreshing in summer.'},
  {id:'f029',tier:4,vn:'bia',north:null,en:'beer',category:'food',example_vn:'Bia Hà Nội và bia Sài Gòn đều ngon.',example_en:'Hanoi beer and Saigon beer are both good.'},
  {id:'f030',tier:4,vn:'sữa',north:null,en:'milk',category:'food',example_vn:'Uống sữa mỗi ngày tốt cho xương.',example_en:'Drinking milk every day is good for bones.'},
  {id:'f031',tier:5,vn:'nước ngọt',north:null,en:'soft drink / soda',category:'food',example_vn:'Bạn muốn uống nước ngọt gì?',example_en:'What soft drink do you want?'},
  {id:'f032',tier:2,vn:'nước mắm',north:null,en:'fish sauce',category:'food',example_vn:'Nước mắm là gia vị không thể thiếu.',example_en:'Fish sauce is an indispensable seasoning.'},
  {id:'f033',tier:5,vn:'ớt',north:null,en:'chili pepper',category:'food',example_vn:'Cho thêm ớt vào cho cay hơn.',example_en:'Add more chili to make it spicier.'},
  {id:'f034',tier:5,vn:'tỏi',north:null,en:'garlic',category:'food',example_vn:'Phi tỏi vàng thơm lừng.',example_en:'Sauté garlic until golden and fragrant.'},
  {id:'f035',tier:5,vn:'gừng',north:null,en:'ginger',category:'food',example_vn:'Gừng làm ấm bụng và tốt cho sức khỏe.',example_en:'Ginger warms the stomach and is good for health.'},
  {id:'f036',tier:2,vn:'muối',north:null,en:'salt',category:'food',example_vn:'Cho ít muối vào nồi canh.',example_en:'Add a little salt to the soup pot.'},
  {id:'f037',tier:5,vn:'đường',north:null,en:'sugar',category:'food',example_vn:'Cà phê của tôi không cần đường.',example_en:"My coffee doesn't need sugar."},
  {id:'f038',tier:5,vn:'chanh',north:null,en:'lime / lemon',category:'food',example_vn:'Vắt chanh vào tô phở cho chua.',example_en:'Squeeze lime into the pho bowl for sourness.'},
  {id:'f039',tier:5,vn:'chuối',north:null,en:'banana',category:'food',example_vn:'Chuối Việt Nam ngọt và thơm lắm.',example_en:'Vietnamese bananas are sweet and fragrant.'},
  {id:'f040',tier:5,vn:'xoài',north:null,en:'mango',category:'food',example_vn:'Xoài chín ngọt ăn với muối ớt.',example_en:'Ripe sweet mango eaten with salt and chili.'},
  {id:'f041',tier:5,vn:'thơm',north:'dứa',en:'pineapple',category:'food',example_vn:'Thơm chín ngọt lắm.',example_en:'Ripe pineapple is very sweet.'},
  {id:'f042',tier:5,vn:'đu đủ',north:null,en:'papaya',category:'food',example_vn:'Đu đủ chín vàng rất bổ dưỡng.',example_en:'Yellow ripe papaya is very nutritious.'},
  {id:'f043',tier:6,vn:'sầu riêng',north:null,en:'durian',category:'food',example_vn:'Sầu riêng có mùi nồng nhưng vị ngon.',example_en:'Durian has a strong smell but delicious taste.'},
  {id:'f044',tier:6,vn:'thanh long',north:null,en:'dragon fruit',category:'food',example_vn:'Thanh long đỏ ngọt hơn thanh long trắng.',example_en:'Red dragon fruit is sweeter than white.'},
  {id:'f045',tier:6,vn:'dưa hấu',north:null,en:'watermelon',category:'food',example_vn:'Dưa hấu mát lạnh rất ngon ngày hè.',example_en:'Cool watermelon is delicious on a summer day.'},
  {id:'f046',tier:6,vn:'nhãn',north:null,en:'longan',category:'food',example_vn:'Nhãn Hưng Yên nổi tiếng rất ngon.',example_en:'Hung Yen longan is famously delicious.'},
  {id:'f047',tier:6,vn:'muỗng',north:'thìa',en:'spoon',category:'food',example_vn:'Cho tôi mượn cái muỗng.',example_en:'Let me borrow a spoon.'},
  {id:'f048',tier:6,vn:'tô',north:'bát',en:'bowl',category:'food',example_vn:'Cho tôi một tô phở lớn.',example_en:'Give me a large bowl of pho.'},
  {id:'f049',tier:6,vn:'đũa',north:null,en:'chopsticks',category:'food',example_vn:'Bạn có thể dùng đũa không?',example_en:'Can you use chopsticks?'},
  {id:'f050',tier:6,vn:'thực đơn',north:null,en:'menu',category:'food',example_vn:'Cho tôi xem thực đơn.',example_en:'Please show me the menu.'},

  // FAMILY
  {id:'fam001',tier:2,vn:'gia đình',north:null,en:'family',category:'family',example_vn:'Gia đình tôi có bốn người.',example_en:'My family has four people.'},
  {id:'fam002',tier:2,vn:'ba',north:'bố',en:'father / dad',category:'family',example_vn:'Ba tôi làm kỹ sư.',example_en:'My father is an engineer.'},
  {id:'fam003',tier:2,vn:'má',north:'mẹ',en:'mother / mom',category:'family',example_vn:'Má tôi nấu ăn rất ngon.',example_en:'My mother cooks very deliciously.'},
  {id:'fam004',tier:2,vn:'anh',north:null,en:'older brother',category:'family',example_vn:'Anh tôi đang học đại học.',example_en:'My older brother is studying at university.'},
  {id:'fam005',tier:2,vn:'chị',north:null,en:'older sister',category:'family',example_vn:'Chị tôi đã lập gia đình rồi.',example_en:'My older sister is already married.'},
  {id:'fam006',tier:2,vn:'em',north:null,en:'younger sibling',category:'family',example_vn:'Em tôi học lớp 5.',example_en:'My younger sibling is in grade 5.'},
  {id:'fam007',tier:2,vn:'em trai',north:null,en:'younger brother',category:'family',example_vn:'Em trai tôi rất nghịch ngợm.',example_en:'My younger brother is very mischievous.'},
  {id:'fam008',tier:2,vn:'em gái',north:null,en:'younger sister',category:'family',example_vn:'Em gái tôi thích học nhạc.',example_en:'My younger sister likes studying music.'},
  {id:'fam009',tier:2,vn:'ông',north:null,en:'grandfather / elderly man',category:'family',example_vn:'Ông nội tôi đã 80 tuổi.',example_en:'My grandfather is 80 years old.'},
  {id:'fam010',tier:2,vn:'bà',north:null,en:'grandmother / elderly woman',category:'family',example_vn:'Bà ngoại kể chuyện rất hay.',example_en:'My grandmother tells stories very well.'},
  {id:'fam011',tier:2,vn:'con',north:null,en:'child (son or daughter)',category:'family',example_vn:'Họ có hai con.',example_en:'They have two children.'},
  {id:'fam012',tier:2,vn:'con trai',north:null,en:'son',category:'family',example_vn:'Con trai tôi học rất giỏi.',example_en:'My son studies very well.'},
  {id:'fam013',tier:2,vn:'con gái',north:null,en:'daughter',category:'family',example_vn:'Con gái tôi thích vẽ tranh.',example_en:'My daughter likes drawing.'},
  {id:'fam014',tier:2,vn:'chồng',north:null,en:'husband',category:'family',example_vn:'Chồng cô ấy là bác sĩ.',example_en:'Her husband is a doctor.'},
  {id:'fam015',tier:2,vn:'vợ',north:null,en:'wife',category:'family',example_vn:'Vợ anh ấy dạy học.',example_en:'His wife is a teacher.'},
  {id:'fam016',tier:2,vn:'bạn trai',north:null,en:'boyfriend',category:'family',example_vn:'Bạn trai cô ấy rất tốt bụng.',example_en:'Her boyfriend is very kind.'},
  {id:'fam017',tier:2,vn:'bạn gái',north:null,en:'girlfriend',category:'family',example_vn:'Bạn gái anh ấy học cùng lớp.',example_en:'His girlfriend is in the same class.'},
  {id:'fam018',tier:2,vn:'bạn bè',north:null,en:'friends',category:'family',example_vn:'Bạn bè tôi rất thân thiện.',example_en:'My friends are very friendly.'},
  {id:'fam019',tier:2,vn:'hàng xóm',north:null,en:'neighbor',category:'family',example_vn:'Hàng xóm tôi rất tốt bụng.',example_en:'My neighbor is very kind.'},
  {id:'fam020',tier:2,vn:'người thân',north:null,en:'relative / loved one',category:'family',example_vn:'Tôi nhớ người thân ở quê.',example_en:'I miss my relatives back home.'},

  // NUMBERS
  {id:'num001',tier:2,vn:'không',north:null,en:'zero (0)',category:'numbers',example_vn:'Số điện thoại bắt đầu bằng không.',example_en:'Phone numbers start with zero.'},
  {id:'num002',tier:1,vn:'một',north:null,en:'one (1)',category:'numbers',example_vn:'Cho tôi một cái bánh mì.',example_en:'Give me one baguette.'},
  {id:'num003',tier:1,vn:'hai',north:null,en:'two (2)',category:'numbers',example_vn:'Tôi muốn hai ly cà phê.',example_en:'I want two coffees.'},
  {id:'num004',tier:2,vn:'ba',north:null,en:'three (3)',category:'numbers',example_vn:'Ba người ngồi ở bàn đó.',example_en:'Three people are sitting at that table.'},
  {id:'num005',tier:2,vn:'bốn',north:null,en:'four (4)',category:'numbers',example_vn:'Chúng tôi có bốn người trong nhóm.',example_en:'We have four people in the group.'},
  {id:'num006',tier:2,vn:'năm',north:null,en:'five (5)',category:'numbers',example_vn:'Năm phút nữa thôi.',example_en:'Just five more minutes.'},
  {id:'num007',tier:2,vn:'sáu',north:null,en:'six (6)',category:'numbers',example_vn:'Tôi thức dậy lúc sáu giờ sáng.',example_en:'I wake up at six in the morning.'},
  {id:'num008',tier:2,vn:'bảy',north:null,en:'seven (7)',category:'numbers',example_vn:'Một tuần có bảy ngày.',example_en:'A week has seven days.'},
  {id:'num009',tier:2,vn:'tám',north:null,en:'eight (8)',category:'numbers',example_vn:'Cửa hàng mở lúc tám giờ sáng.',example_en:'The store opens at eight in the morning.'},
  {id:'num010',tier:2,vn:'chín',north:null,en:'nine (9)',category:'numbers',example_vn:'Tôi có chín quyển sách.',example_en:'I have nine books.'},
  {id:'num011',tier:3,vn:'mười',north:null,en:'ten (10)',category:'numbers',example_vn:'Mười nghìn đồng thôi à?',example_en:'Only ten thousand dong?'},
  {id:'num012',tier:3,vn:'hai mươi',north:null,en:'twenty (20)',category:'numbers',example_vn:'Tôi hai mươi tuổi.',example_en:'I am twenty years old.'},
  {id:'num013',tier:3,vn:'ba mươi',north:null,en:'thirty (30)',category:'numbers',example_vn:'Ba mươi phút nữa đến nơi.',example_en:'Thirty more minutes to arrive.'},
  {id:'num014',tier:3,vn:'một trăm',north:null,en:'one hundred (100)',category:'numbers',example_vn:'Một trăm nghìn đồng.',example_en:'One hundred thousand dong.'},
  {id:'num015',tier:3,vn:'một nghìn',north:null,en:'one thousand (1000)',category:'numbers',example_vn:'Một nghìn đồng không mua được gì.',example_en:'One thousand dong cannot buy anything.'},
  {id:'num016',tier:3,vn:'nửa',north:null,en:'half',category:'numbers',example_vn:'Cho tôi nửa con gà.',example_en:'Give me half a chicken.'},
  {id:'num017',tier:3,vn:'đôi',north:null,en:'a pair / two',category:'numbers',example_vn:'Tôi mua một đôi giày mới.',example_en:'I bought a new pair of shoes.'},
  {id:'num018',tier:3,vn:'vài',north:null,en:'a few / several',category:'numbers',example_vn:'Tôi cần vài phút thôi.',example_en:'I only need a few minutes.'},
  {id:'num019',tier:3,vn:'mấy',north:null,en:'how many / a few',category:'numbers',example_vn:'Mấy giờ rồi?',example_en:'What time is it?'},
  {id:'num020',tier:3,vn:'triệu',north:null,en:'million',category:'numbers',example_vn:'Cái điện thoại đó mười triệu đồng.',example_en:'That phone costs ten million dong.'},

  // TIME
  {id:'t001',tier:2,vn:'hôm nay',north:null,en:'today',category:'time',example_vn:'Hôm nay trời đẹp lắm.',example_en:'Today the weather is very nice.'},
  {id:'t002',tier:2,vn:'hôm qua',north:null,en:'yesterday',category:'time',example_vn:'Hôm qua tôi đi xem phim.',example_en:'Yesterday I went to see a movie.'},
  {id:'t003',tier:2,vn:'ngày mai',north:null,en:'tomorrow',category:'time',example_vn:'Ngày mai tôi sẽ đến gặp bạn.',example_en:'Tomorrow I will come to see you.'},
  {id:'t004',tier:2,vn:'bây giờ',north:null,en:'now / right now',category:'time',example_vn:'Bây giờ là mấy giờ?',example_en:'What time is it now?'},
  {id:'t005',tier:2,vn:'sau',north:null,en:'after / later',category:'time',example_vn:'Tôi sẽ gọi bạn sau.',example_en:'I will call you later.'},
  {id:'t006',tier:2,vn:'trước',north:null,en:'before / earlier',category:'time',example_vn:"Đến trước bảy giờ nhé.",example_en:"Come before seven o'clock."},
  {id:'t007',tier:2,vn:'sáng',north:null,en:'morning',category:'time',example_vn:'Buổi sáng tôi uống cà phê.',example_en:'In the morning I drink coffee.'},
  {id:'t008',tier:2,vn:'trưa',north:null,en:'noon / midday',category:'time',example_vn:'Buổi trưa chúng tôi ăn cơm.',example_en:'At noon we eat rice.'},
  {id:'t009',tier:2,vn:'chiều',north:null,en:'afternoon',category:'time',example_vn:'Buổi chiều tôi đi chơi với bạn.',example_en:'In the afternoon I hang out with friends.'},
  {id:'t010',tier:2,vn:'tối',north:null,en:'evening',category:'time',example_vn:'Buổi tối tôi đọc sách.',example_en:'In the evening I read books.'},
  {id:'t011',tier:3,vn:'đêm',north:null,en:'night (late)',category:'time',example_vn:'Ban đêm trời lạnh hơn.',example_en:'At night it is colder.'},
  {id:'t012',tier:3,vn:'tuần',north:null,en:'week',category:'time',example_vn:'Tuần này tôi rất bận.',example_en:'This week I am very busy.'},
  {id:'t013',tier:3,vn:'tháng',north:null,en:'month',category:'time',example_vn:'Tháng này có ba mươi ngày.',example_en:'This month has thirty days.'},
  {id:'t014',tier:3,vn:'năm',north:null,en:'year',category:'time',example_vn:'Năm ngoái tôi đến Việt Nam.',example_en:'Last year I came to Vietnam.'},
  {id:'t015',tier:3,vn:'giờ',north:null,en:"hour / o'clock",category:'time',example_vn:'Bây giờ là ba giờ chiều.',example_en:'Now it is three in the afternoon.'},
  {id:'t016',tier:3,vn:'phút',north:null,en:'minute',category:'time',example_vn:'Chờ tôi năm phút.',example_en:'Wait for me five minutes.'},
  {id:'t017',tier:3,vn:'thứ Hai',north:null,en:'Monday',category:'time',example_vn:'Thứ Hai tôi đi học.',example_en:'On Monday I go to school.'},
  {id:'t018',tier:3,vn:'thứ Ba',north:null,en:'Tuesday',category:'time',example_vn:'Thứ Ba tôi có lớp tiếng Anh.',example_en:'On Tuesday I have English class.'},
  {id:'t019',tier:3,vn:'thứ Tư',north:null,en:'Wednesday',category:'time',example_vn:'Thứ Tư tôi đi tập thể dục.',example_en:'On Wednesday I go exercise.'},
  {id:'t020',tier:3,vn:'thứ Năm',north:null,en:'Thursday',category:'time',example_vn:'Thứ Năm tôi họp nhóm.',example_en:'On Thursday I have a group meeting.'},
  {id:'t021',tier:3,vn:'thứ Sáu',north:null,en:'Friday',category:'time',example_vn:'Thứ Sáu là ngày cuối tuần làm việc.',example_en:'Friday is the last workday of the week.'},
  {id:'t022',tier:3,vn:'thứ Bảy',north:null,en:'Saturday',category:'time',example_vn:'Thứ Bảy tôi đi chơi.',example_en:'On Saturday I go out.'},
  {id:'t023',tier:3,vn:'Chủ Nhật',north:null,en:'Sunday',category:'time',example_vn:'Chủ Nhật tôi nghỉ ngơi ở nhà.',example_en:'On Sunday I rest at home.'},
  {id:'t024',tier:3,vn:'cuối tuần',north:null,en:'weekend',category:'time',example_vn:'Cuối tuần bạn làm gì?',example_en:'What do you do on weekends?'},
  {id:'t025',tier:3,vn:'ngày',north:null,en:'day / date',category:'time',example_vn:'Hôm nay là ngày mấy?',example_en:'What date is today?'},

  // COLORS
  {id:'c001',tier:2,vn:'đỏ',north:null,en:'red',category:'colors',example_vn:'Cái áo đỏ này rất đẹp.',example_en:'This red shirt is very beautiful.'},
  {id:'c002',tier:2,vn:'xanh lam',north:null,en:'blue',category:'colors',example_vn:'Bầu trời xanh lam thật đẹp.',example_en:'The blue sky is very beautiful.'},
  {id:'c003',tier:2,vn:'xanh lá',north:null,en:'green',category:'colors',example_vn:'Rừng xanh lá cây rất mát.',example_en:'The green forest is very cool.'},
  {id:'c004',tier:2,vn:'vàng',north:null,en:'yellow',category:'colors',example_vn:'Hoa hướng dương màu vàng rực rỡ.',example_en:'Sunflowers are bright yellow.'},
  {id:'c005',tier:2,vn:'trắng',north:null,en:'white',category:'colors',example_vn:'Chiếc áo trắng sạch đẹp lắm.',example_en:'The white shirt looks clean and nice.'},
  {id:'c006',tier:2,vn:'đen',north:null,en:'black',category:'colors',example_vn:'Mèo đen này rất đáng yêu.',example_en:'This black cat is very adorable.'},
  {id:'c007',tier:2,vn:'hồng',north:null,en:'pink',category:'colors',example_vn:'Hoa đào màu hồng rất đẹp.',example_en:'The pink peach blossoms are very beautiful.'},
  {id:'c008',tier:2,vn:'tím',north:null,en:'purple',category:'colors',example_vn:'Cô ấy mặc váy tím.',example_en:'She is wearing a purple dress.'},
  {id:'c009',tier:2,vn:'cam',north:null,en:'orange (color)',category:'colors',example_vn:'Quả cam màu cam đẹp.',example_en:'The orange fruit is beautifully orange.'},
  {id:'c010',tier:2,vn:'nâu',north:null,en:'brown',category:'colors',example_vn:'Cái túi nâu này rất đẹp.',example_en:'This brown bag is very nice.'},
  {id:'c011',tier:2,vn:'xám',north:null,en:'gray',category:'colors',example_vn:'Bầu trời xám khi trời mưa.',example_en:'The sky is gray when it rains.'},
  {id:'c012',tier:2,vn:'xanh dương',north:null,en:'dark blue / navy',category:'colors',example_vn:'Anh ấy mặc quần xanh dương.',example_en:'He is wearing dark blue pants.'},

  // PLACES
  {id:'pl001',tier:2,vn:'nhà hàng',north:null,en:'restaurant',category:'places',example_vn:'Chúng tôi ăn tối ở nhà hàng đó.',example_en:'We have dinner at that restaurant.'},
  {id:'pl002',tier:2,vn:'quán ăn',north:null,en:'food stall / eatery',category:'places',example_vn:'Quán ăn nhỏ này rất ngon.',example_en:'This small eatery is very delicious.'},
  {id:'pl003',tier:2,vn:'quán cà phê',north:null,en:'cafe / coffee shop',category:'places',example_vn:'Tôi hay ngồi làm việc ở quán cà phê.',example_en:'I often sit and work at a cafe.'},
  {id:'pl004',tier:2,vn:'khách sạn',north:null,en:'hotel',category:'places',example_vn:'Khách sạn này có hồ bơi.',example_en:'This hotel has a swimming pool.'},
  {id:'pl005',tier:2,vn:'bệnh viện',north:null,en:'hospital',category:'places',example_vn:'Bệnh viện gần nhà tôi.',example_en:'The hospital is near my house.'},
  {id:'pl006',tier:2,vn:'trường học',north:null,en:'school',category:'places',example_vn:'Trường học của tôi rất to.',example_en:'My school is very large.'},
  {id:'pl007',tier:2,vn:'siêu thị',north:null,en:'supermarket',category:'places',example_vn:'Tôi mua đồ ở siêu thị mỗi tuần.',example_en:'I shop at the supermarket every week.'},
  {id:'pl008',tier:2,vn:'ngân hàng',north:null,en:'bank',category:'places',example_vn:'Ngân hàng mở cửa lúc tám giờ sáng.',example_en:'The bank opens at eight in the morning.'},
  {id:'pl009',tier:2,vn:'sân bay',north:null,en:'airport',category:'places',example_vn:'Sân bay Tân Sơn Nhất rất đông.',example_en:'Tan Son Nhat airport is very busy.'},
  {id:'pl010',tier:2,vn:'ga tàu',north:null,en:'train station',category:'places',example_vn:'Ga tàu gần trung tâm thành phố.',example_en:'The train station is near the city center.'},
  {id:'pl011',tier:2,vn:'bưu điện',north:null,en:'post office',category:'places',example_vn:'Tôi gửi bưu kiện ở bưu điện.',example_en:'I send packages at the post office.'},
  {id:'pl012',tier:2,vn:'công viên',north:null,en:'park',category:'places',example_vn:'Tôi đi dạo trong công viên mỗi sáng.',example_en:'I walk in the park every morning.'},
  {id:'pl013',tier:2,vn:'bãi biển',north:null,en:'beach',category:'places',example_vn:'Bãi biển Đà Nẵng rất đẹp.',example_en:'Da Nang beach is very beautiful.'},
  {id:'pl014',tier:2,vn:'thành phố',north:null,en:'city',category:'places',example_vn:'Thành phố Hồ Chí Minh rất náo nhiệt.',example_en:'Ho Chi Minh City is very bustling.'},
  {id:'pl015',tier:2,vn:'làng',north:null,en:'village',category:'places',example_vn:'Làng quê Việt Nam rất yên bình.',example_en:'Vietnamese countryside villages are very peaceful.'},

  // PREPOSITIONS
  {id:'prep001',tier:2,vn:'ở',north:null,en:'at / in (location)',category:'prepositions',example_vn:'Tôi ở nhà hôm nay.',example_en:'I am at home today.'},
  {id:'prep002',tier:2,vn:'trong',north:null,en:'inside / in',category:'prepositions',example_vn:'Sách ở trong túi.',example_en:'The book is inside the bag.'},
  {id:'prep003',tier:2,vn:'ngoài',north:null,en:'outside / out',category:'prepositions',example_vn:'Trời ngoài kia đẹp lắm.',example_en:'It is very beautiful outside.'},
  {id:'prep004',tier:2,vn:'trên',north:null,en:'on top / above',category:'prepositions',example_vn:'Điện thoại ở trên bàn.',example_en:'The phone is on the table.'},
  {id:'prep005',tier:2,vn:'dưới',north:null,en:'below / under',category:'prepositions',example_vn:'Mèo nằm dưới ghế.',example_en:'The cat is lying under the chair.'},
  {id:'prep006',tier:2,vn:'trước',north:null,en:'in front of / before',category:'prepositions',example_vn:'Đứng trước cửa chờ tôi.',example_en:'Stand in front of the door and wait for me.'},
  {id:'prep007',tier:2,vn:'sau',north:null,en:'behind / after',category:'prepositions',example_vn:'Nhà hàng ở sau siêu thị.',example_en:'The restaurant is behind the supermarket.'},
  {id:'prep008',tier:2,vn:'bên cạnh',north:null,en:'next to / beside',category:'prepositions',example_vn:'Bưu điện bên cạnh ngân hàng.',example_en:'The post office is next to the bank.'},
  {id:'prep009',tier:2,vn:'giữa',north:null,en:'between / in the middle',category:'prepositions',example_vn:'Tôi ngồi giữa hai người bạn.',example_en:'I sit between two friends.'},
  {id:'prep010',tier:2,vn:'và',north:null,en:'and',category:'prepositions',example_vn:'Tôi mua cà phê và bánh mì.',example_en:'I bought coffee and a baguette.'},
  {id:'prep011',tier:3,vn:'nhưng',north:null,en:'but',category:'prepositions',example_vn:"Tôi thích đồ cay nhưng không ăn được.",example_en:"I like spicy food but can't eat it."},
  {id:'prep012',tier:3,vn:'hoặc',north:null,en:'or',category:'prepositions',example_vn:'Bạn muốn cà phê hoặc trà?',example_en:'Do you want coffee or tea?'},
  {id:'prep013',tier:3,vn:'vì',north:null,en:'because',category:'prepositions',example_vn:'Tôi ở nhà vì trời mưa.',example_en:'I stay home because it is raining.'},
  {id:'prep014',tier:3,vn:'nên',north:null,en:'so / therefore',category:'prepositions',example_vn:'Trời mưa nên tôi ở nhà.',example_en:'It rained so I stayed home.'},
  {id:'prep015',tier:3,vn:'nếu',north:null,en:'if',category:'prepositions',example_vn:'Nếu trời đẹp, tôi sẽ đi chơi.',example_en:'If the weather is nice, I will go out.'},
  {id:'prep016',tier:3,vn:'khi',north:null,en:'when',category:'prepositions',example_vn:'Khi tôi đến, bạn đang ngủ.',example_en:'When I arrived, you were sleeping.'},
  {id:'prep017',tier:3,vn:'với',north:null,en:'with',category:'prepositions',example_vn:'Tôi đi ăn với bạn bè.',example_en:'I go eat with friends.'},
  {id:'prep018',tier:3,vn:'về',north:null,en:'about / regarding',category:'prepositions',example_vn:'Bạn biết gì về Việt Nam?',example_en:'What do you know about Vietnam?'},
  {id:'prep019',tier:3,vn:'từ',north:null,en:'from',category:'prepositions',example_vn:'Tôi đến từ Hà Nội.',example_en:'I am from Hanoi.'},
  {id:'prep020',tier:3,vn:'đến',north:null,en:'to / until',category:'prepositions',example_vn:'Từ nhà đến chợ mất bao lâu?',example_en:'How long from home to the market?'},
];

// =============================================================================
// GRAMMAR — A1 patterns with dynamic sentence templates
// Format: {id, pattern, category, note, example_vn, example_en,
//          template_vn, template_en, slots}
//
// slots defines what fills each {placeholder}:
//   type:'pronoun'  — fixed list of pronouns
//   type:'word'     — random word from player's unlocked pool
//   category:       — which word category to pull from
//   filter:         — optional extra filter e.g. 'verb','adj'
//
// If a template can't be filled (not enough words unlocked),
// the fixed example_vn/example_en is used as fallback.
// =============================================================================
// =============================================================================
// GRAMMAR — A1 patterns with curated examples and word-order exercises
// Format: {id, category, pattern, note, examples:[{vn,en}], requires:{categories,tiers},
//          word_order_exercises:[{prompt_en, tiles, answer}]}
// =============================================================================
const GRAMMAR = [

  // ── IDENTITY & DESCRIPTION ────────────────────────────────────────────────
  {
    id:'gr01', category:'identity',
    pattern:'Subject + là + Noun',
    note:'Là = "to be" before nouns. Never use it before adjectives.',
    requires:{categories:['greetings']},
    examples:[
      {vn:'Tôi là sinh viên.', en:'I am a student.'},
      {vn:'Đây là bạn tôi.', en:'This is my friend.'},
      {vn:'Anh ấy là giáo viên.', en:'He is a teacher.'},
    ],
    word_order_exercises:[
      {prompt_en:'I am a student.', tiles:['Tôi','là','sinh viên','.'], answer:['Tôi','là','sinh viên','.']},
      {prompt_en:'She is a doctor.', tiles:['Cô ấy','là','bác sĩ','.'], answer:['Cô ấy','là','bác sĩ','.']},
    ],
  },
  {
    id:'gr02', category:'identity',
    pattern:'Subject + Adjective (no "to be")',
    note:'Adjectives act as predicates directly — no copula needed before them.',
    requires:{categories:['adjectives']},
    examples:[
      {vn:'Cô ấy rất đẹp.', en:'She is very beautiful.'},
      {vn:'Phở này ngon lắm!', en:'This pho is very delicious!'},
      {vn:'Bài này khó quá.', en:'This lesson is too difficult.'},
    ],
    word_order_exercises:[
      {prompt_en:'This pho is delicious.', tiles:['Phở này','ngon','.'], answer:['Phở này','ngon','.']},
      {prompt_en:'The weather today is hot.', tiles:['Trời','hôm nay','nóng','.'], answer:['Trời','hôm nay','nóng','.']},
    ],
  },
  {
    id:'gr03', category:'identity',
    pattern:'rất + Adjective (very)',
    note:'Rất intensifies adjectives. Place it directly before the adjective.',
    requires:{categories:['adjectives']},
    examples:[
      {vn:'Cà phê này rất ngon.', en:'This coffee is very good.'},
      {vn:'Anh ấy rất cao.', en:'He is very tall.'},
      {vn:'Bài tập này rất khó.', en:'This exercise is very difficult.'},
    ],
    word_order_exercises:[
      {prompt_en:'This coffee is very good.', tiles:['Cà phê này','rất','ngon','.'], answer:['Cà phê này','rất','ngon','.']},
      {prompt_en:'He is very tall.', tiles:['Anh ấy','rất','cao','.'], answer:['Anh ấy','rất','cao','.']},
    ],
  },
  {
    id:'gr04', category:'identity',
    pattern:'Adjective + quá (so / too)',
    note:'Quá follows the adjective. Expresses strong degree or exclamation.',
    requires:{categories:['adjectives']},
    examples:[
      {vn:'Trời nóng quá!', en:'It is so hot!'},
      {vn:'Đồ ăn này ngon quá!', en:'This food is so delicious!'},
      {vn:'Cái áo này đắt quá.', en:'This shirt is too expensive.'},
    ],
    word_order_exercises:[
      {prompt_en:'It is so hot!', tiles:['Trời','nóng','quá','!'], answer:['Trời','nóng','quá','!']},
      {prompt_en:'This food is so delicious!', tiles:['Đồ ăn này','ngon','quá','!'], answer:['Đồ ăn này','ngon','quá','!']},
    ],
  },
  {
    id:'gr05', category:'identity',
    pattern:'Adjective + lắm (very — Southern emphasis)',
    note:'Lắm follows the adjective. Common in Southern Vietnamese, stronger than rất.',
    requires:{categories:['adjectives']},
    examples:[
      {vn:'Cà phê này ngon lắm!', en:'This coffee is very delicious!'},
      {vn:'Anh ấy tốt lắm.', en:'He is very good.'},
      {vn:'Bài này khó lắm.', en:'This lesson is very difficult.'},
    ],
    word_order_exercises:[
      {prompt_en:'This coffee is very delicious!', tiles:['Cà phê này','ngon','lắm','!'], answer:['Cà phê này','ngon','lắm','!']},
    ],
  },
  {
    id:'gr06', category:'identity',
    pattern:'hơi + Adjective (a bit / slightly)',
    note:'Hơi softens adjectives. Often implies mild dissatisfaction.',
    requires:{categories:['adjectives']},
    examples:[
      {vn:'Cà phê này hơi đắt.', en:'This coffee is a bit expensive.'},
      {vn:'Bài này hơi khó.', en:'This lesson is a bit difficult.'},
      {vn:'Phòng này hơi nhỏ.', en:'This room is a bit small.'},
    ],
    word_order_exercises:[
      {prompt_en:'This coffee is a bit expensive.', tiles:['Cà phê này','hơi','đắt','.'], answer:['Cà phê này','hơi','đắt','.']},
    ],
  },

  // ── NEGATION ──────────────────────────────────────────────────────────────
  {
    id:'gr07', category:'negation',
    pattern:'Subject + không + Verb/Adj',
    note:'Không negates verbs and adjectives. Place it directly before the verb.',
    requires:{categories:['verbs']},
    examples:[
      {vn:'Tôi không hiểu.', en:"I don't understand."},
      {vn:'Anh ấy không đi.', en:"He doesn't go."},
      {vn:'Cô ấy không vui.', en:'She is not happy.'},
    ],
    word_order_exercises:[
      {prompt_en:"I don't understand.", tiles:['Tôi','không','hiểu','.'], answer:['Tôi','không','hiểu','.']},
      {prompt_en:"She doesn't want to eat.", tiles:['Cô ấy','không','muốn','ăn','.'], answer:['Cô ấy','không','muốn','ăn','.']},
    ],
  },
  {
    id:'gr08', category:'negation',
    pattern:'Subject + không phải là + Noun',
    note:'Use không phải là (never không là) to negate identity statements with là.',
    requires:{categories:['greetings']},
    examples:[
      {vn:'Anh ấy không phải là bác sĩ.', en:'He is not a doctor.'},
      {vn:'Đây không phải là nhà tôi.', en:'This is not my house.'},
      {vn:'Tôi không phải là người Việt Nam.', en:'I am not Vietnamese.'},
    ],
    word_order_exercises:[
      {prompt_en:'He is not a doctor.', tiles:['Anh ấy','không phải là','bác sĩ','.'], answer:['Anh ấy','không phải là','bác sĩ','.']},
    ],
  },
  {
    id:'gr09', category:'negation',
    pattern:'Subject + chưa + Verb (not yet)',
    note:"Chưa = 'not yet'. Implies the action is expected. Answer: rồi (done) or chưa.",
    requires:{categories:['verbs']},
    examples:[
      {vn:'Tôi chưa ăn cơm.', en:"I haven't eaten yet."},
      {vn:'Bạn chưa uống cà phê à?', en:"You haven't had coffee yet?"},
      {vn:'Anh ấy chưa về nhà.', en:"He hasn't gone home yet."},
    ],
    word_order_exercises:[
      {prompt_en:"I haven't eaten yet.", tiles:['Tôi','chưa','ăn','cơm','.'], answer:['Tôi','chưa','ăn','cơm','.']},
    ],
  },
  {
    id:'gr10', category:'negation',
    pattern:'Verb + chưa? (Have you … yet?)',
    note:"Tag chưa? at the end to ask 'done yet?'. Reply: rồi (yes) or chưa (not yet).",
    requires:{categories:['verbs']},
    examples:[
      {vn:'Bạn ăn cơm chưa?', en:'Have you eaten yet?'},
      {vn:'Bạn uống cà phê chưa?', en:'Have you had coffee yet?'},
      {vn:'Anh ấy về chưa?', en:'Has he gone home yet?'},
    ],
    word_order_exercises:[
      {prompt_en:'Have you eaten yet?', tiles:['Bạn','ăn','cơm','chưa','?'], answer:['Bạn','ăn','cơm','chưa','?']},
    ],
  },

  // ── QUESTIONS ─────────────────────────────────────────────────────────────
  {
    id:'gr11', category:'questions',
    pattern:'Statement + không? (Yes/No question)',
    note:'Append không? to any statement to form a yes/no question.',
    requires:{categories:['greetings']},
    examples:[
      {vn:'Bạn khỏe không?', en:'Are you well?'},
      {vn:'Cà phê này ngon không?', en:'Is this coffee good?'},
      {vn:'Bạn muốn đi không?', en:'Do you want to go?'},
    ],
    word_order_exercises:[
      {prompt_en:'Are you well?', tiles:['Bạn','khỏe','không','?'], answer:['Bạn','khỏe','không','?']},
      {prompt_en:'Do you want to eat?', tiles:['Bạn','muốn','ăn','không','?'], answer:['Bạn','muốn','ăn','không','?']},
    ],
  },
  {
    id:'gr12', category:'questions',
    pattern:'Subject + có + Verb + không?',
    note:'The có...không? frame is the standard yes/no question for actions.',
    requires:{categories:['verbs']},
    examples:[
      {vn:'Bạn có ăn phở không?', en:'Do you eat pho?'},
      {vn:'Anh ấy có đi không?', en:'Is he going?'},
      {vn:'Bạn có hiểu không?', en:'Do you understand?'},
    ],
    word_order_exercises:[
      {prompt_en:'Do you eat pho?', tiles:['Bạn','có','ăn','phở','không','?'], answer:['Bạn','có','ăn','phở','không','?']},
      {prompt_en:'Do you understand?', tiles:['Bạn','có','hiểu','không','?'], answer:['Bạn','có','hiểu','không','?']},
    ],
  },
  {
    id:'gr13', category:'questions',
    pattern:'Subject + Verb + gì? (what)',
    note:'Gì stays at the end in the object position — same place the answer would go.',
    requires:{categories:['verbs']},
    examples:[
      {vn:'Bạn muốn uống gì?', en:'What do you want to drink?'},
      {vn:'Anh ấy ăn gì?', en:'What does he eat?'},
      {vn:'Bạn đang làm gì?', en:'What are you doing?'},
    ],
    word_order_exercises:[
      {prompt_en:'What do you want to drink?', tiles:['Bạn','muốn','uống','gì','?'], answer:['Bạn','muốn','uống','gì','?']},
      {prompt_en:'What are you doing?', tiles:['Bạn','đang','làm','gì','?'], answer:['Bạn','đang','làm','gì','?']},
    ],
  },
  {
    id:'gr14', category:'questions',
    pattern:'Ai + Verb? / Verb + ai? (who)',
    note:'Ai (who) sits where the subject or object would be.',
    requires:{categories:['verbs']},
    examples:[
      {vn:'Ai đó?', en:'Who is it?'},
      {vn:'Bạn gặp ai?', en:'Who did you meet?'},
      {vn:'Ai muốn ăn phở?', en:'Who wants to eat pho?'},
    ],
    word_order_exercises:[
      {prompt_en:'Who wants to eat pho?', tiles:['Ai','muốn','ăn','phở','?'], answer:['Ai','muốn','ăn','phở','?']},
    ],
  },
  {
    id:'gr15', category:'questions',
    pattern:'Subject + ở đâu? (where)',
    note:'Ở đâu replaces the location at the end of the sentence.',
    requires:{categories:['greetings']},
    examples:[
      {vn:'Bạn ở đâu?', en:'Where are you?'},
      {vn:'Nhà hàng ở đâu?', en:'Where is the restaurant?'},
      {vn:'Bạn làm việc ở đâu?', en:'Where do you work?'},
    ],
    word_order_exercises:[
      {prompt_en:'Where are you?', tiles:['Bạn','ở đâu','?'], answer:['Bạn','ở đâu','?']},
      {prompt_en:'Where is the restaurant?', tiles:['Nhà hàng','ở đâu','?'], answer:['Nhà hàng','ở đâu','?']},
    ],
  },
  {
    id:'gr16', category:'questions',
    pattern:'Subject + Verb + khi nào? (when)',
    note:'Khi nào can go at the start or end. End position is more natural in speech.',
    requires:{categories:['verbs']},
    examples:[
      {vn:'Bạn đến khi nào?', en:'When do you arrive?'},
      {vn:'Khi nào bạn về?', en:'When are you going home?'},
      {vn:'Bạn đi khi nào?', en:'When are you leaving?'},
    ],
    word_order_exercises:[
      {prompt_en:'When do you arrive?', tiles:['Bạn','đến','khi nào','?'], answer:['Bạn','đến','khi nào','?']},
    ],
  },
  {
    id:'gr17', category:'questions',
    pattern:'Tại sao + Subject + Verb? (why)',
    note:'Tại sao (why) usually starts the question. Vì sao is a more formal variant.',
    requires:{categories:['adjectives']},
    examples:[
      {vn:'Tại sao bạn buồn?', en:'Why are you sad?'},
      {vn:'Tại sao anh ấy không đến?', en:"Why didn't he come?"},
      {vn:'Tại sao cà phê này đắt vậy?', en:'Why is this coffee so expensive?'},
    ],
    word_order_exercises:[
      {prompt_en:'Why are you sad?', tiles:['Tại sao','bạn','buồn','?'], answer:['Tại sao','bạn','buồn','?']},
    ],
  },
  {
    id:'gr18', category:'questions',
    pattern:'Subject + như thế nào? (how / what is it like)',
    note:'Như thế nào asks for description. Thế nào alone is more casual in speech.',
    requires:{categories:['greetings']},
    examples:[
      {vn:'Phở ở đây như thế nào?', en:'How is the pho here?'},
      {vn:'Thời tiết hôm nay như thế nào?', en:'What is the weather like today?'},
      {vn:'Bạn cảm thấy như thế nào?', en:'How do you feel?'},
    ],
    word_order_exercises:[
      {prompt_en:'How is the pho here?', tiles:['Phở ở đây','như thế nào','?'], answer:['Phở ở đây','như thế nào','?']},
    ],
  },
  {
    id:'gr19', category:'questions',
    pattern:'Bao nhiêu + Noun? (how much/many)',
    note:'Bao nhiêu asks about quantity or price. Goes before the noun.',
    requires:{categories:['numbers']},
    examples:[
      {vn:'Bao nhiêu tiền?', en:'How much money?'},
      {vn:'Bao nhiêu người?', en:'How many people?'},
      {vn:'Cái này bao nhiêu tiền?', en:'How much does this cost?'},
    ],
    word_order_exercises:[
      {prompt_en:'How much does this cost?', tiles:['Cái này','bao nhiêu','tiền','?'], answer:['Cái này','bao nhiêu','tiền','?']},
    ],
  },
  {
    id:'gr20', category:'questions',
    pattern:'Đi mất bao lâu? (how long does it take)',
    note:'Bao lâu asks about duration. Mất = takes (time).',
    requires:{categories:['verbs']},
    examples:[
      {vn:'Đi bao lâu?', en:'How long does it take?'},
      {vn:'Từ đây đến đó mất bao lâu?', en:'How long does it take to get there?'},
      {vn:'Học tiếng Việt mất bao lâu?', en:'How long does it take to learn Vietnamese?'},
    ],
    word_order_exercises:[
      {prompt_en:'How long does it take?', tiles:['Đi','mất','bao lâu','?'], answer:['Đi','mất','bao lâu','?']},
    ],
  },

  // ── TENSE MARKERS ─────────────────────────────────────────────────────────
  {
    id:'gr21', category:'tense',
    pattern:'Subject + đã + Verb + rồi (completed past)',
    note:'Đã marks a completed action. Rồi (already) at the end adds emphasis.',
    requires:{categories:['verbs']},
    examples:[
      {vn:'Tôi đã ăn phở rồi.', en:'I already ate pho.'},
      {vn:'Anh ấy đã về nhà rồi.', en:'He already went home.'},
      {vn:'Tôi đã uống cà phê rồi.', en:'I already had coffee.'},
    ],
    word_order_exercises:[
      {prompt_en:'I already ate pho.', tiles:['Tôi','đã','ăn','phở','rồi','.'], answer:['Tôi','đã','ăn','phở','rồi','.']},
      {prompt_en:'He already went home.', tiles:['Anh ấy','đã','về','nhà','rồi','.'], answer:['Anh ấy','đã','về','nhà','rồi','.']},
    ],
  },
  {
    id:'gr22', category:'tense',
    pattern:'Subject + đang + Verb (present progressive)',
    note:'Đang marks an action happening right now — equivalent to English -ing.',
    requires:{categories:['verbs']},
    examples:[
      {vn:'Tôi đang ăn cơm.', en:'I am eating rice.'},
      {vn:'Cô ấy đang uống cà phê.', en:'She is drinking coffee.'},
      {vn:'Anh ấy đang đi làm.', en:'He is going to work.'},
    ],
    word_order_exercises:[
      {prompt_en:'I am eating rice.', tiles:['Tôi','đang','ăn','cơm','.'], answer:['Tôi','đang','ăn','cơm','.']},
      {prompt_en:'She is drinking coffee.', tiles:['Cô ấy','đang','uống','cà phê','.'], answer:['Cô ấy','đang','uống','cà phê','.']},
    ],
  },
  {
    id:'gr23', category:'tense',
    pattern:'Subject + sẽ + Verb (future)',
    note:'Sẽ marks future intention or prediction. Time words reinforce the meaning.',
    requires:{categories:['verbs']},
    examples:[
      {vn:'Tôi sẽ ăn phở.', en:'I will eat pho.'},
      {vn:'Ngày mai tôi sẽ đến.', en:'Tomorrow I will come.'},
      {vn:'Bạn sẽ uống gì?', en:'What will you drink?'},
    ],
    word_order_exercises:[
      {prompt_en:'I will eat pho.', tiles:['Tôi','sẽ','ăn','phở','.'], answer:['Tôi','sẽ','ăn','phở','.']},
      {prompt_en:'Tomorrow I will come.', tiles:['Ngày mai','tôi','sẽ','đến','.'], answer:['Ngày mai','tôi','sẽ','đến','.']},
    ],
  },
  {
    id:'gr24', category:'tense',
    pattern:'Subject + vừa + Verb + xong (just finished)',
    note:'Vừa...xong = just completed. Xong signals completion of the action.',
    requires:{categories:['verbs']},
    examples:[
      {vn:'Tôi vừa ăn xong.', en:'I just finished eating.'},
      {vn:'Anh ấy vừa uống cà phê xong.', en:'He just finished drinking coffee.'},
      {vn:'Tôi vừa về nhà xong.', en:'I just got home.'},
    ],
    word_order_exercises:[
      {prompt_en:'I just finished eating.', tiles:['Tôi','vừa','ăn','xong','.'], answer:['Tôi','vừa','ăn','xong','.']},
    ],
  },
  {
    id:'gr25', category:'tense',
    pattern:'Subject + sắp + Verb + rồi (about to)',
    note:'Sắp = about to / soon. Marks an action that will happen very shortly.',
    requires:{categories:['verbs']},
    examples:[
      {vn:'Tôi sắp đi rồi.', en:'I am about to leave.'},
      {vn:'Cô ấy sắp đến rồi.', en:'She is about to arrive.'},
      {vn:'Tôi sắp ăn cơm rồi.', en:'I am about to eat.'},
    ],
    word_order_exercises:[
      {prompt_en:'I am about to leave.', tiles:['Tôi','sắp','đi','rồi','.'], answer:['Tôi','sắp','đi','rồi','.']},
    ],
  },

  // ── MODAL VERBS ────────────────────────────────────────────────────────────
  {
    id:'gr26', category:'modal',
    pattern:'Subject + muốn + Verb (want to)',
    note:"Muốn (want) chains directly to the next verb — no 'to' particle.",
    requires:{categories:['verbs']},
    examples:[
      {vn:'Tôi muốn ăn phở.', en:'I want to eat pho.'},
      {vn:'Bạn muốn uống gì?', en:'What do you want to drink?'},
      {vn:'Anh ấy muốn học tiếng Việt.', en:'He wants to learn Vietnamese.'},
    ],
    word_order_exercises:[
      {prompt_en:'I want to eat pho.', tiles:['Tôi','muốn','ăn','phở','.'], answer:['Tôi','muốn','ăn','phở','.']},
      {prompt_en:'What do you want to drink?', tiles:['Bạn','muốn','uống','gì','?'], answer:['Bạn','muốn','uống','gì','?']},
    ],
  },
  {
    id:'gr27', category:'modal',
    pattern:'Subject + cần + Verb/Noun (need)',
    note:'Cần (need) works before both verbs and nouns. No infinitive marker.',
    requires:{categories:['verbs']},
    examples:[
      {vn:'Tôi cần uống nước.', en:'I need to drink water.'},
      {vn:'Bạn cần giúp đỡ không?', en:'Do you need help?'},
      {vn:'Anh ấy cần nghỉ ngơi.', en:'He needs to rest.'},
    ],
    word_order_exercises:[
      {prompt_en:'I need to drink water.', tiles:['Tôi','cần','uống','nước','.'], answer:['Tôi','cần','uống','nước','.']},
    ],
  },
  {
    id:'gr28', category:'modal',
    pattern:'Subject + có thể + Verb + không? (can)',
    note:'Có thể = can / able to. Pairs with không? to make polite requests.',
    requires:{categories:['verbs']},
    examples:[
      {vn:'Bạn có thể nói chậm hơn không?', en:'Can you speak more slowly?'},
      {vn:'Tôi có thể ngồi đây không?', en:'Can I sit here?'},
      {vn:'Bạn có thể giúp tôi không?', en:'Can you help me?'},
    ],
    word_order_exercises:[
      {prompt_en:'Can you help me?', tiles:['Bạn','có thể','giúp','tôi','không','?'], answer:['Bạn','có thể','giúp','tôi','không','?']},
      {prompt_en:'Can I sit here?', tiles:['Tôi','có thể','ngồi','đây','không','?'], answer:['Tôi','có thể','ngồi','đây','không','?']},
    ],
  },
  {
    id:'gr29', category:'modal',
    pattern:'Subject + phải + Verb (must / have to)',
    note:"Phải = must / have to. Implies obligation. Không phải = don't have to.",
    requires:{categories:['verbs']},
    examples:[
      {vn:'Tôi phải đi bây giờ.', en:'I have to go now.'},
      {vn:'Bạn phải ăn sáng.', en:'You must eat breakfast.'},
      {vn:'Anh ấy phải học bài.', en:'He has to study his lesson.'},
    ],
    word_order_exercises:[
      {prompt_en:'I have to go now.', tiles:['Tôi','phải','đi','bây giờ','.'], answer:['Tôi','phải','đi','bây giờ','.']},
    ],
  },
  {
    id:'gr30', category:'modal',
    pattern:'Subject + nên + Verb (should)',
    note:'Nên = should. Gives advice or recommendation. Weaker obligation than phải.',
    requires:{categories:['verbs']},
    examples:[
      {vn:'Bạn nên uống nhiều nước.', en:'You should drink a lot of water.'},
      {vn:'Anh ấy nên nghỉ ngơi.', en:'He should rest.'},
      {vn:'Bạn nên ăn sáng.', en:'You should eat breakfast.'},
    ],
    word_order_exercises:[
      {prompt_en:'You should drink a lot of water.', tiles:['Bạn','nên','uống','nhiều nước','.'], answer:['Bạn','nên','uống','nhiều nước','.']},
    ],
  },
  {
    id:'gr31', category:'modal',
    pattern:"Cho tôi + Noun (give me / I'd like)",
    note:'Cho tôi is the standard ordering formula in restaurants and shops.',
    requires:{categories:['food']},
    examples:[
      {vn:'Cho tôi một tô phở bò.', en:'Give me one bowl of beef pho.'},
      {vn:'Cho tôi xem thực đơn.', en:'Can I see the menu please.'},
      {vn:'Cho tôi một ly cà phê sữa đá.', en:'Give me one iced milk coffee.'},
    ],
    word_order_exercises:[
      {prompt_en:'Give me one bowl of pho.', tiles:['Cho tôi','một tô','phở','.'], answer:['Cho tôi','một tô','phở','.']},
      {prompt_en:'Can I see the menu?', tiles:['Cho tôi','xem','thực đơn','.'], answer:['Cho tôi','xem','thực đơn','.']},
    ],
  },
  {
    id:'gr32', category:'modal',
    pattern:'Subject + được + Verb (allowed to / managed to)',
    note:'Được = allowed to, or managed to do something successfully.',
    requires:{categories:['verbs']},
    examples:[
      {vn:'Tôi được ăn đồ cay.', en:'I am allowed to eat spicy food.'},
      {vn:'Bạn được ngồi đây.', en:'You are allowed to sit here.'},
      {vn:'Tôi không ăn được đồ cay.', en:"I can't handle spicy food."},
    ],
    word_order_exercises:[
      {prompt_en:'You are allowed to sit here.', tiles:['Bạn','được','ngồi','đây','.'], answer:['Bạn','được','ngồi','đây','.']},
    ],
  },

  // ── COMPARISONS ────────────────────────────────────────────────────────────
  {
    id:'gr33', category:'comparisons',
    pattern:'A + Adj + hơn + B (A is more … than B)',
    note:"Hơn = more than / -er. Place after the adjective. No extra 'more' needed.",
    requires:{categories:['adjectives']},
    examples:[
      {vn:'Phở ngon hơn cơm.', en:'Pho is more delicious than rice.'},
      {vn:'Anh ấy cao hơn tôi.', en:'He is taller than me.'},
      {vn:'Hà Nội lạnh hơn Sài Gòn.', en:'Hanoi is colder than Saigon.'},
    ],
    word_order_exercises:[
      {prompt_en:'Pho is more delicious than rice.', tiles:['Phở','ngon','hơn','cơm','.'], answer:['Phở','ngon','hơn','cơm','.']},
      {prompt_en:'He is taller than me.', tiles:['Anh ấy','cao','hơn','tôi','.'], answer:['Anh ấy','cao','hơn','tôi','.']},
    ],
  },
  {
    id:'gr34', category:'comparisons',
    pattern:'A + Adj + nhất (A is the most …)',
    note:'Nhất = most / -est. Place after the adjective as a superlative suffix.',
    requires:{categories:['adjectives']},
    examples:[
      {vn:'Phở là món ăn ngon nhất.', en:'Pho is the most delicious dish.'},
      {vn:'Đây là cà phê ngon nhất.', en:'This is the best coffee.'},
      {vn:'Anh ấy là người cao nhất.', en:'He is the tallest person.'},
    ],
    word_order_exercises:[
      {prompt_en:'This is the best coffee.', tiles:['Đây','là','cà phê','ngon nhất','.'], answer:['Đây','là','cà phê','ngon nhất','.']},
    ],
  },
  {
    id:'gr35', category:'comparisons',
    pattern:'A + Adj + bằng + B (A is as … as B)',
    note:"Bằng = as … as. Used for equality. Không bằng = not as … as.",
    requires:{categories:['adjectives']},
    examples:[
      {vn:'Cô ấy cao bằng anh ấy.', en:'She is as tall as him.'},
      {vn:'Cà phê ở đây ngon bằng ở Hà Nội.', en:'Coffee here is as good as in Hanoi.'},
      {vn:'Tôi không học giỏi bằng bạn.', en:"I don't study as well as you."},
    ],
    word_order_exercises:[
      {prompt_en:'She is as tall as him.', tiles:['Cô ấy','cao','bằng','anh ấy','.'], answer:['Cô ấy','cao','bằng','anh ấy','.']},
    ],
  },

  // ── CLASSIFIERS ────────────────────────────────────────────────────────────
  {
    id:'gr36', category:'classifiers',
    pattern:'con + animal noun',
    note:'Con is the classifier for animals and some small objects.',
    requires:{categories:['numbers']},
    examples:[
      {vn:'Tôi có một con mèo.', en:'I have a cat.'},
      {vn:'Hai con chó đang chạy.', en:'Two dogs are running.'},
      {vn:'Con cá này lớn lắm.', en:'This fish is very big.'},
    ],
    word_order_exercises:[
      {prompt_en:'I have a cat.', tiles:['Tôi','có','một','con mèo','.'], answer:['Tôi','có','một','con mèo','.']},
    ],
  },
  {
    id:'gr37', category:'classifiers',
    pattern:'cái + object noun',
    note:'Cái is the general classifier for inanimate objects.',
    requires:{categories:['nouns'], tiers:{nouns:2}},
    examples:[
      {vn:'Cho tôi một cái bút.', en:'Give me a pen.'},
      {vn:'Cái bàn này rất lớn.', en:'This table is very large.'},
      {vn:'Tôi mua hai cái áo.', en:'I bought two shirts.'},
    ],
    word_order_exercises:[
      {prompt_en:'Give me a pen.', tiles:['Cho tôi','một','cái bút','.'], answer:['Cho tôi','một','cái bút','.']},
    ],
  },
  {
    id:'gr38', category:'classifiers',
    pattern:'người + person noun',
    note:'Người classifies people. Use when counting or referring to a person.',
    requires:{categories:['numbers']},
    examples:[
      {vn:'Có ba người trong phòng.', en:'There are three people in the room.'},
      {vn:'Một người bạn của tôi.', en:'A friend of mine.'},
      {vn:'Nhiều người đang chờ.', en:'Many people are waiting.'},
    ],
    word_order_exercises:[
      {prompt_en:'There are three people in the room.', tiles:['Có','ba','người','trong phòng','.'], answer:['Có','ba','người','trong phòng','.']},
    ],
  },
  {
    id:'gr39', category:'classifiers',
    pattern:'cuốn/quyển + book noun',
    note:'Cuốn and quyển are interchangeable classifiers for books.',
    requires:{categories:['nouns'], tiers:{nouns:2}},
    examples:[
      {vn:'Tôi đọc một cuốn sách.', en:'I read a book.'},
      {vn:'Hai quyển sách này rất hay.', en:'These two books are very good.'},
      {vn:'Cho tôi mượn một cuốn sách.', en:'Let me borrow a book.'},
    ],
    word_order_exercises:[
      {prompt_en:'I read a book.', tiles:['Tôi','đọc','một','cuốn sách','.'], answer:['Tôi','đọc','một','cuốn sách','.']},
    ],
  },

  // ── LINKING STRUCTURES ─────────────────────────────────────────────────────
  {
    id:'gr40', category:'linking',
    pattern:'vì … nên … (because … so …)',
    note:'Vì introduces the reason, nên introduces the result.',
    requires:{categories:['verbs','adjectives']},
    examples:[
      {vn:'Vì trời mưa nên tôi ở nhà.', en:'Because it rained, I stayed home.'},
      {vn:'Vì tôi mệt nên tôi không đi.', en:"Because I'm tired, I'm not going."},
      {vn:'Vì phở ngon nên tôi ăn mỗi ngày.', en:'Because pho is delicious, I eat it every day.'},
    ],
    word_order_exercises:[
      {prompt_en:'Because it rained I stayed home.', tiles:['Vì','trời mưa','nên','tôi','ở nhà','.'], answer:['Vì','trời mưa','nên','tôi','ở nhà','.']},
      {prompt_en:'Because pho is delicious I eat it every day.', tiles:['Vì','phở ngon','nên','tôi','ăn','mỗi ngày','.'], answer:['Vì','phở ngon','nên','tôi','ăn','mỗi ngày','.']},
    ],
  },
  {
    id:'gr41', category:'linking',
    pattern:'nếu … thì … (if … then …)',
    note:'Nếu = if. Thì = then (optional but common in speech).',
    requires:{categories:['verbs']},
    examples:[
      {vn:'Nếu trời đẹp thì tôi sẽ đi chơi.', en:"If the weather is nice I'll go out."},
      {vn:'Nếu bạn muốn thì tôi sẽ đến.', en:'If you want, I will come.'},
      {vn:'Nếu đói thì ăn đi.', en:"If you're hungry then eat."},
    ],
    word_order_exercises:[
      {prompt_en:"If you're hungry then eat.", tiles:['Nếu','đói','thì','ăn','đi','.'], answer:['Nếu','đói','thì','ăn','đi','.']},
      {prompt_en:'If you want I will come.', tiles:['Nếu','bạn muốn','thì','tôi','sẽ đến','.'], answer:['Nếu','bạn muốn','thì','tôi','sẽ đến','.']},
    ],
  },
  {
    id:'gr42', category:'linking',
    pattern:'khi + clause (when)',
    note:'Khi introduces a time clause. The main clause follows.',
    requires:{categories:['verbs']},
    examples:[
      {vn:'Khi tôi đến, bạn đang ngủ.', en:'When I arrived, you were sleeping.'},
      {vn:'Khi ăn phở, tôi thêm chanh.', en:'When eating pho, I add lime.'},
      {vn:'Khi đói, tôi ăn cơm.', en:'When hungry, I eat rice.'},
    ],
    word_order_exercises:[
      {prompt_en:'When hungry I eat rice.', tiles:['Khi','đói','tôi','ăn','cơm','.'], answer:['Khi','đói','tôi','ăn','cơm','.']},
    ],
  },
  {
    id:'gr43', category:'linking',
    pattern:'A + và + B (and)',
    note:'Và connects nouns, adjectives, or clauses. Same as English "and".',
    requires:{categories:['verbs']},
    examples:[
      {vn:'Tôi uống cà phê và ăn bánh mì.', en:'I drink coffee and eat a baguette.'},
      {vn:'Phở ngon và rẻ.', en:'Pho is delicious and cheap.'},
      {vn:'Anh ấy cao và đẹp trai.', en:'He is tall and handsome.'},
    ],
    word_order_exercises:[
      {prompt_en:'I drink coffee and eat a baguette.', tiles:['Tôi','uống','cà phê','và','ăn','bánh mì','.'], answer:['Tôi','uống','cà phê','và','ăn','bánh mì','.']},
    ],
  },
  {
    id:'gr44', category:'linking',
    pattern:'A + nhưng + B (but)',
    note:'Nhưng connects contrasting clauses. Same position as English "but".',
    requires:{categories:['adjectives']},
    examples:[
      {vn:'Sầu riêng thơm nhưng hôi.', en:'Durian is fragrant but smelly.'},
      {vn:"Tôi thích cà phê nhưng không uống được.", en:"I like coffee but can't drink it."},
      {vn:'Bài này khó nhưng thú vị.', en:'This lesson is difficult but interesting.'},
    ],
    word_order_exercises:[
      {prompt_en:'Pho is delicious but expensive.', tiles:['Phở','ngon','nhưng','đắt','.'], answer:['Phở','ngon','nhưng','đắt','.']},
    ],
  },
  {
    id:'gr45', category:'linking',
    pattern:'Subject + cũng + Verb/Adj (also / too)',
    note:"Cũng = also. Goes before the verb or adjective, never at the end.",
    requires:{categories:['verbs']},
    examples:[
      {vn:'Tôi cũng thích phở.', en:'I also like pho.'},
      {vn:'Anh ấy cũng muốn đi.', en:'He also wants to go.'},
      {vn:'Cô ấy cũng uống cà phê.', en:'She also drinks coffee.'},
    ],
    word_order_exercises:[
      {prompt_en:'I also like pho.', tiles:['Tôi','cũng','thích','phở','.'], answer:['Tôi','cũng','thích','phở','.']},
      {prompt_en:'He also wants to go.', tiles:['Anh ấy','cũng','muốn','đi','.'], answer:['Anh ấy','cũng','muốn','đi','.']},
    ],
  },
];

const ACHIEVEMENTS = [
  {id:'first_word',title:'First Steps',desc:'See your first word',icon:'👀'},
  {id:'words_10',title:'Getting Started',desc:'Learn 10 words',icon:'📖'},
  {id:'words_50',title:'Dedicated Learner',desc:'Learn 50 words',icon:'📚'},
  {id:'words_100',title:'Century',desc:'Learn 100 words',icon:'💯'},
  {id:'mastered_1',title:'First Mastery',desc:'Master your first word',icon:'⭐'},
  {id:'mastered_10',title:'Word Master',desc:'Master 10 words',icon:'🌟'},
  {id:'streak_3',title:'On a Roll',desc:'3-day streak',icon:'🔥'},
  {id:'streak_7',title:'Week Warrior',desc:'7-day streak',icon:'🗓️'},
  {id:'consec_10',title:'Perfect Ten',desc:'10 correct in a row',icon:'🎯'},
  {id:'food_5',title:'Foodie',desc:'Master 5 food words',icon:'🍜'},
  {id:'categories_3',title:'Explorer',desc:'Unlock 3 categories',icon:'🗺️'},
  {id:'typist',title:'Typist',desc:'Type 50 correct answers',icon:'⌨️'},
];

// type:'tier' items: unlockKey=category, tier=which tier this unlocks, cost scales up per tier
const SHOP_ITEMS = [
  // ── Modes (flat unlock) ──────────────────────────────────────────────────
  {id:'mode_type',    type:'mode', name:'Write It Mode',   cost:500,  desc:'Type Vietnamese answers',           unlockKey:'type_answer', icon:'✍️'},
  {id:'mode_match',   type:'mode', name:'Match Pairs',     cost:750,  desc:'Match EN↔VN pairs by clicking',     unlockKey:'match_pairs',  icon:'🔀'},
  {id:'mode_fill',    type:'mode', name:'Fill the Blank',  cost:1200, desc:'Complete sentences with missing words', unlockKey:'fill_sentence', icon:'📝'},
  {id:'mode_word_order', type:'mode', name:'Word Order',   cost:1200, desc:'Tap words to build sentences in order', unlockKey:'word_order',   icon:'🔧'},
  {id:'mode_grammar', type:'mode', name:'Grammar Drill',   cost:1800, desc:'Practice A1 sentence patterns',     unlockKey:'grammar_quiz', icon:'🧠'},

  // ── Greetings: tier1 free (8 words), tier2 unlocks rest (12 words) ──────
  {id:'greetings_t2', type:'tier', name:'Greetings II',    cost:120,  desc:'+12 more greeting phrases', unlockKey:'greetings', tier:2, wordsInTier:12},

  // ── Verbs: tier1 free (6), tiers 2-6 add 10/10/10/10/4 ─────────────────
  {id:'verbs_t2', type:'tier', name:'Verbs II',   cost:150, desc:'+10 action words', unlockKey:'verbs', tier:2, wordsInTier:10},
  {id:'verbs_t3', type:'tier', name:'Verbs III',  cost:280, desc:'+10 more verbs',   unlockKey:'verbs', tier:3, wordsInTier:10},
  {id:'verbs_t4', type:'tier', name:'Verbs IV',   cost:450, desc:'+10 more verbs',   unlockKey:'verbs', tier:4, wordsInTier:10},
  {id:'verbs_t5', type:'tier', name:'Verbs V',    cost:650, desc:'+10 more verbs',   unlockKey:'verbs', tier:5, wordsInTier:10},
  {id:'verbs_t6', type:'tier', name:'Verbs VI',   cost:900, desc:'+4 final verbs (complete)', unlockKey:'verbs', tier:6, wordsInTier:4},

  // ── Adjectives: tier1 free (4), tiers 2-5 add 10/10/10/6 ────────────────
  {id:'adjectives_t2', type:'tier', name:'Adjectives II',  cost:150, desc:'+10 describing words', unlockKey:'adjectives', tier:2, wordsInTier:10},
  {id:'adjectives_t3', type:'tier', name:'Adjectives III', cost:280, desc:'+10 more adjectives',  unlockKey:'adjectives', tier:3, wordsInTier:10},
  {id:'adjectives_t4', type:'tier', name:'Adjectives IV',  cost:450, desc:'+10 more adjectives',  unlockKey:'adjectives', tier:4, wordsInTier:10},
  {id:'adjectives_t5', type:'tier', name:'Adjectives V',   cost:650, desc:'+6 final adjectives (complete)', unlockKey:'adjectives', tier:5, wordsInTier:6},

  // ── Food: tier1 free (2: phở+cà phê), tiers 2-6 add 10/10/10/10/8 ──────
  {id:'food_t2', type:'tier', name:'Food & Drink II',  cost:150, desc:'+10 food & drink words', unlockKey:'food', tier:2, wordsInTier:10},
  {id:'food_t3', type:'tier', name:'Food & Drink III', cost:280, desc:'+10 more food words',    unlockKey:'food', tier:3, wordsInTier:10},
  {id:'food_t4', type:'tier', name:'Food & Drink IV',  cost:450, desc:'+10 more food words',    unlockKey:'food', tier:4, wordsInTier:10},
  {id:'food_t5', type:'tier', name:'Food & Drink V',   cost:650, desc:'+10 more food words',    unlockKey:'food', tier:5, wordsInTier:10},
  {id:'food_t6', type:'tier', name:'Food & Drink VI',  cost:900, desc:'+8 final food words (complete)', unlockKey:'food', tier:6, wordsInTier:8},

  // ── Numbers: tier1 free (2), tier2 +8, tier3 +10 ────────────────────────
  {id:'numbers_t2', type:'tier', name:'Numbers II',  cost:100, desc:'+8 numbers (3–10)', unlockKey:'numbers', tier:2, wordsInTier:8},
  {id:'numbers_t3', type:'tier', name:'Numbers III', cost:200, desc:'+10 numbers & quantities (complete)', unlockKey:'numbers', tier:3, wordsInTier:10},

  // ── Nouns: fully locked, tier2 +10, tier3 +10, tier4 +10 ────────────────
  {id:'nouns_t2', type:'tier', name:'Objects I',   cost:200, desc:'First 10 everyday objects', unlockKey:'nouns', tier:1, wordsInTier:10},
  {id:'nouns_t3', type:'tier', name:'Objects II',  cost:380, desc:'+10 more objects',           unlockKey:'nouns', tier:2, wordsInTier:10},
  {id:'nouns_t4', type:'tier', name:'Objects III', cost:580, desc:'+10 final objects (complete)', unlockKey:'nouns', tier:3, wordsInTier:10},

  // ── Family: fully locked, unlocks all 20 at once (small category) ───────
  {id:'family_t2', type:'tier', name:'Family',     cost:250, desc:'All 20 family terms', unlockKey:'family', tier:1, wordsInTier:20},

  // ── Time: fully locked, tier2 +10, tier3 +15 ────────────────────────────
  {id:'time_t2', type:'tier', name:'Time & Days I',  cost:200, desc:'First 10 time expressions', unlockKey:'time', tier:1, wordsInTier:10},
  {id:'time_t3', type:'tier', name:'Time & Days II', cost:380, desc:'+15 more (days of week + complete)', unlockKey:'time', tier:2, wordsInTier:15},

  // ── Colors: fully locked, unlocks all 12 at once (small category) ───────
  {id:'colors_t2', type:'tier', name:'Colors',     cost:150, desc:'All 12 colors', unlockKey:'colors', tier:1, wordsInTier:12},

  // ── Places: fully locked, unlocks all 15 at once (small category) ───────
  {id:'places_t2', type:'tier', name:'Places',     cost:250, desc:'All 15 place words', unlockKey:'places', tier:1, wordsInTier:15},

  // ── Prepositions: fully locked, tier2 +10, tier3 +10 ────────────────────
  {id:'prepositions_t2', type:'tier', name:'Prepositions I',  cost:300, desc:'First 10 prepositions & connectors', unlockKey:'prepositions', tier:1, wordsInTier:10},
  {id:'prepositions_t3', type:'tier', name:'Prepositions II', cost:550, desc:'+10 more (complete)',                  unlockKey:'prepositions', tier:2, wordsInTier:10},

  // ── Grammar categories (flat unlock per category) ────────────────────────
  // identity & description: free (used from day 1 in grammar reference)
  {id:'gram_negation',     type:'grammar', name:'Negation',      cost:200,  desc:'không / chưa / không phải là',    unlockKey:'negation',     icon:'🚫'},
  {id:'gram_questions',    type:'grammar', name:'Questions',     cost:250,  desc:'gì / ai / ở đâu / khi nào / tại sao', unlockKey:'questions', icon:'❓'},
  {id:'gram_tense',        type:'grammar', name:'Tense Markers', cost:350,  desc:'đã / đang / sẽ / vừa / sắp',      unlockKey:'tense',        icon:'⏳'},
  {id:'gram_modal',        type:'grammar', name:'Modal Verbs',   cost:400,  desc:'muốn / cần / có thể / phải / nên', unlockKey:'modal',        icon:'💬'},
  {id:'gram_comparisons',  type:'grammar', name:'Comparisons',   cost:500,  desc:'hơn / nhất / bằng',               unlockKey:'comparisons',  icon:'⚖️'},
  {id:'gram_classifiers',  type:'grammar', name:'Classifiers',   cost:450,  desc:'con / cái / người / cuốn',         unlockKey:'classifiers',  icon:'🔢'},
  {id:'gram_linking',      type:'grammar', name:'Linking',       cost:500,  desc:'vì…nên / nếu…thì / và / nhưng / cũng', unlockKey:'linking',  icon:'🔗'},
];

const CATEGORY_META = {
  greetings:{label:'Greetings',icon:'👋',color:'#2D9B6F'},
  verbs:{label:'Verbs',icon:'⚡',color:'#E8B84B'},
  adjectives:{label:'Adjectives',icon:'✨',color:'#9B6F9B'},
  nouns:{label:'Objects',icon:'📦',color:'#4B8BE8'},
  food:{label:'Food & Drink',icon:'🍜',color:'#D96B48'},
  family:{label:'Family',icon:'👨‍👩‍👧',color:'#E84B8B'},
  numbers:{label:'Numbers',icon:'🔢',color:'#4BE8D9'},
  time:{label:'Time',icon:'⏰',color:'#8BE84B'},
  colors:{label:'Colors',icon:'🎨',color:'#E8C44B'},
  places:{label:'Places',icon:'📍',color:'#4B6FE8'},
  prepositions:{label:'Prepositions',icon:'🔗',color:'#8BA3B8'},
};
