# #1)
# name = "Abbos"
# print(name)
#2)
# age = 14
# print(f"Mening yoshim: {age}")
#3)
# city = "Pitnak"
# print(f"Mening tug'ilgan shahrim: {city}")
#4)
# name = "Abbos"
# age = 14
# city = "Pitnak"
# print(f"Mening yoshim {age}. Mening ismim {name}. Men {city}da tug'ilganman!")
#5)
# name = "Abbos"
# surname = "Akhmedov"
# print(f"Ismim {name}. Familyam {surname}.")
#6)
# something = "telegram"
# big = something.upper()
# small = something.lower()
# print(big , small)
#7)
# first_letter = input("Biron matnni kiriting: ")
# task = first_letter.capitalize()
# print(task)
#8)
# anything = "Biror matn"
# print(anything.lstrip())
# print(anything.rstrip())
#9)
# text = "Ixtisoslashgan"
# print(text[4:8])
#10)
# text = "Python uchun test"
# bolak = text.split()
# print(bolak)
# if "test" in bolak:
#     print('yes')
# else:
#     print("no")
# print(text[7:12])
#11)
# number = 8
# number2 = 12
# print(number + number2)
#12)
# number1 = int(input("Birinchi sonni kiriting: "))
# number2 = int(input("Ikkinchi sonni kiriting: "))
# if number1 > number2:
#     print(number1 - number2)
# elif number2 > number1:
#     print(number2 - number1)
# else:
#     print("Ikkalasi teng!")
#13)
# first_number = int(input("Birinchi sonni kiriting: "))
# second_number = int(input("Ikkinchi sonni kiriting: "))
# third_number = int(input("Uchinchi sonni kiriting: "))
# multiplication = (first_number * second_number * third_number)
# print(multiplication)
#14)
# first_number = int(input("Bo'linuvchini kiriting: "))
# second_number = int(input("Bo'luvchini kiriting: "))
# result = first_number // second_number
# print(result)
#15)
# kvadrat = int(input("Kvadratga ko'tarmoqchi bo'lgan soningizni kiriting: "))
# kub = int(input("Kubga ko'tarmoqchi bo'lgan soningizni kiriting: "))
# print(f"Kvadrat: {kvadrat**2}. Kub: {kub**3}")
# #16)
# list1 = ["Pomidor" , "Boding" , "Piyoz" , "Olma" , "Anor"]
# print(list1)
#17)
# list = ["Anor" , "Bodring" , "Pomidor"]
# list[1] = "Sabzi"
# print(list)
#18)
# list = ["Pomidor" , "Boding" , "Piyoz" , "Olma" , "Anor"]
# list.append("Qalampir")
# print(list)
#19)
# list = ["Pomidor" , "Boding" , "Piyoz" , "Olma" , "Anor"]
# list.pop(0)
# print(list)
#20)
# list = ["Pomidor" , "Boding" , "Piyoz" , "Olma" , "Anor"]
# print(list[0])
#21)
# friends = ["Behruz" , "Salim" , "Asilbek"]
# behruz = (f"Salom , {friends[0]}!")
# salim = (f"Salom , {friends[1]}!")
# asilbek = (f"Salom , {friends[2]}!")
# print(behruz , salim , asilbek)
#22)
# empty_list = input("Sevimli mahsulotingizni kiriting: ")
# list = [empty_list]
# print(list)
#23)
# list = [2 , 5 , 3 , 1 , 4]
# list.sort()
# print(list)
#24)
# list = [1 , 2 , 3 , 4 , 5]
# list.reverse()
# print(list)
#25)
# list = ["Pomidor" , "Boding" , "Piyoz" , "Olma" , "Anor"]
# print(len(list))
#26)
# name = input("Iltimos, ismingizni kiriting: ")
# age = int(input("Iltimos, yoshingizni kiriting: "))
# if age < 18:
#     print(f"{name}, afsuski dasturga kira olmaysiz!")
# else:
#     print(f"Tabriklaymiz {name}, siz dasturga kira olasiz!")
#27)
# first = int(input("Iltimos, birinchi sonni kiriting: "))
# second = int(input("Iltimos, ikkinchi sonni kiriting: "))
# if first > second:
#     print(f"{first} {second} dan katta!")
# elif first < second:
#     print(f"{second} {first} dan katta!")
# else: print("Ikkala son teng!")
#28)
# list = ["O'zbekiston" , "Rossiya" , "Amerika" , "Hindiston" , "Belorusiya"]
# nation = input("Biron davlatni kiriting: ")
# if nation in list:
#     print("Siz kiritgan davlat ro'yxatda mavjud!")
# else: print("Siz kiritgan davlat ro'yxatda mavjud emas!")
#29)
# cost = [10000 , 20000 , 30000]
# soliq_1 = 10000 + 10000/15**(100)
# soliq_2 = 20000 + 20000/15**(100)
# soliq_3 = 30000 + 30000/15**(100)
# print(soliq_1 , soliq_2 , soliq_3)

#1)
# temp = int(input("Iltimos, havo haroratini kiriting: "))
# if temp <= 0:
#     print("Havo muzlash haroratida!")
# elif 1 < temp < 10:
#     print("Havo harorati sovuq!")
# elif 11 < temp < 20:
#     print("Havo harorati salqin!")
# elif 21 < 30:
#     print("Havo harorati iliq!")
# else:
#     ("Havo harorati issiq!")
#3)
# day = int(input("Kun sonini kiriting: "))
# if day == 1:
#     print("Bugun dushanba!")
# elif day == 2:
#     print("Bugun seshanba!")
# elif day == 3:
#     print("Bugun chorshanba!")
# elif day == 4:
#     print("Bugun payshanba!")
# elif day == 5:
#     print("Bugun juma!")
# elif day == 6:
#     print("Bugun shanba!")
# elif day == 7:
#     print("Bugun yakshanba!")
# else:
#     print("Iltimos, hafta kunini to'g'ri kiriting!")
#4)
# month = input("Iltimos, tug'ilgan oyingizni kiriting: ")
# if month == "dekabr" or "yanvar" or "fevral":
#     print("Siz qishda tug'ilgansiz!")
# elif month == "mart" or "aprel" or "may":
#     print("Siz bahorda tug'ilgansiz!")
# elif month == "iyun" or "iyul" or "avgust":
#     print("Siz yozda tug'ilgansiz!")
# elif month == "sentyabr" or "oktyabr" or "noyabr":
#     print("Siz kuzda tug'ilgansiz!")
# else:
#     print("Iltimos, tug'ilgan oyingizni to'g'ri kiriting!")
#5)
# car = int(input("Avtomabilingiz tezligini kiriting: "))
# if car <= 60:
#     print("Sizga jarima yo'q!")
# elif 61 < car < 80:
#     print("Siz ogohlantirish oldingiz!")
# elif 81 < car < 100:
#     print("Sizga jarima bor!")
# elif car >= 100:
#     print("Sizda katta jarima mavjud!")
# else: print("Avtomabil tezligini to''g'ri kiriting!")
#6)
# game = input("Iltimos, o'yin darajasini kiriting(boshlang'ich / o'rta / qiyin / profissional): ")
# if game == "bsohlang'ich":
#     print("O'yin oson o'tadi va sizga barcha qoidalar tushuntiriladi!")
# elif game == "o'rta":
#     print("O'yin o'rtacha qiyinlikda o'tadi!")
# elif game == "qiyin":
#     print("O'yin nisbatan qiyin o'tadi!")
# elif game == "profissional":
#     print("O'yin juda qiyin bo'ladi. Agar siz o'yin bo'yicha expert bo'lmasangiz o'ynashni tavsiya qilmaymiz!")
# else: print("Afsuski, bunday o'yin darajasi mavjud emas!")
#7)
# phone = input("Sizda mavjud telefon nomini kiriting: ")
# if phone == "Iphone":
#     print("Sizning telefoningiz Apple kompaniyasiga tegishli!")
# elif phone == "Galaxy":
#     print("Sizning telefoningiz Samsung kompaniyasiga tegishli!")
# elif phone == "Redmi":
#     print("Sizning telefoningiz Xiaomi kompaniyasiga tegishli!")
# elif phone == "P50":
#     print("Sizning telefoningiz Huawei kompaniyasiga tegishli!")
# else: print("Afsuski biz sizning telefoningiz kompaiyasini topa olmadik!")
#8)
# age = int(input("Yoshingizni kiriting: "))
# if 0 < age < 2:
#     print("Siz papasiz!")
# elif 3 < age < 12:
#     print("Siz bolasiz!")
# elif 13 < age < 17:
#     print("Siz o'smirsiz!")
# elif 18 < age < 59:
#     print("Siz kattasiz!")
# elif age >= 60:
#     print("Siz qariyasiz!")
#9)
# work = input("Faningizni kiriting: ")
# if work == "Fizika":
#     print("Sizning texnika sohasidasiz!")
# elif work == "Biologiya":
#     print("Suz tibbiyot sohasidasiz!")
# elif work == "Tarix":
#     print("Siz gumanitar sohadasiz!")
# else:  print("Siz tanlgan soha bizga ma'lum emas!")
#10)
# while True:
#     months = {
#         "yanvar":31,
#         "fevral":28,
#         "mart":31,
#         "aprel":30,
#         "may":31,
#         "iyun":30,
#         "iyul":31,
#         "avgust":31,
#         "sentyabr":30,
#         "oktyabr":31,
#         "noyabr":30,
#         "dekabr":31
#     }
#11)
# weather = input("Ob-havo holatini kiriting(quyoshli/yomg'irli): ")
# if weather == "quyoshli":
#     print("Havo yaxshi! Futbolkada yurishingiz mumkin.")
# elif weather == "yomgirli":
#     print("Havo salqinroq. Soyabon esdan chiqmasin!")
# elif weather == "qorli":
#     print("Havo sovuq. Ko'chaga chiqishdan oldin qalinroq kiyining!")
# elif weather == "shamolli":
#     print("Havo salqinroq. Egningizga biror narsa kiyib oling!")
# elif weather == "bulutli":
#     print("Havo iliq. Yomg'ir yog'ishi mumkin!")
# else: print("Ob-havo holatini to'g'ri kiriting!")
#12)
# status = input("Koddagi status qiymatini kiriting: ")
# if status == 200:
#     print("OK")
# elif status == 404:
#     print("Not Found")
# elif status == 500:
#     print("Server Error")
# elif status == 403:
#     print("Forbidden")
# else: print("Kod statusi topilmadi!")
#13)
# sport = input("O'namoqchi bo'lgan sport turingizni kiriting: ")
# if sport == "fudbol":
#     print("Siz to'p bilan o'ynaysiz!")
# elif sport == "tennis":
#     print("Siz raketka bilan  o'ynaysiz!")
# elif sport == "shaxmat":
#     print("Siz donalar bilan o'ynaysiz!")
# elif sport == "boks":
#     print("Siz qo'lqoplar bilan o'ynaysiz!")
# else: 
#     print("Siz o'ynamoqchi bo'lgan sport topilmadi!")
#14)
# lang = input("Tilni tanlang(uz/ru/en/fr): ")
# if lang == "uz":
#     print("Salom!")
# elif lang == "ru":
#     print("Privet!")
# elif lang == "en":
#     print("Hello!")
# elif lang == "fr":
#     print("Bonjour!")
# else: print("Til topilmadi!")
#15)
# season = input("Faslni kiriting: ")
# if season == "qish":
#     print("Qalin kiyining!")
# elif season == "bahor":
#     print("Yupqaroq kiyining!")
# elif season == "yoz":
#     print("Fudbolkada yurishiz mumkin!")
# elif season == "kuz":
#     print("Qalinroq kiyining!")
# else: print("Ushbu fasl mavjud emas!")
#16)
# month = input("Oy raqamini kiriting(1 - yanvar): ")
# if month == "Yanvar":
#     print(f"{month} - qish oyi!")
# elif month == "Fevarl":
#     print(f"{month} - qish oyi!")
# elif month == "Mart":
#     print(f"{month} - bahor oyi!")
# elif month == "Aprel":
#     print(f"{month} - bahor oyi!")
# elif month == "May":
#     print(f"{month} - bahor oyi!")
# elif month == "Iyun":
#     print(f"{month} - yoz oyi!")
# elif month == "Iyul":
#     print(f"{month} - yoz oyi!")
# elif month == "Avgust":
#     print(f"{month} - yoz oyi!")
# elif month == "Sentyabr":
#     print(f"{month} - kuz oyi!")
# elif month == "Oktyabr":
#     print(f"{month} - kuz oyi!")
# elif month == "Noyabr":
#     print(f"{month} - kuz oyi!")
# elif month == "Dekabr":
#     print(f"{month} - qish oyi!")
# else: print("Bunday oy mavjud emas!")
#17)
# time = int(input("Vaqtni kiriting: "))
# if 0 < time <= 5:
#     print("Tungi salom!")
# elif 6 < time <=11:
#     print("Hayrli tong!")
# elif 12 < time <= 17:
#     print("Xayrli kun!")
# elif 18 < time < 23:
#     print("Hayrli hech!")
# elif time >= 24:
#     print("Vaqtni to'g'ri kiriting!")
#18)
# time = int(input("Vaqtni kiriting: "))
# if 0 < time <= 5:
#     print("Tungi salom!")
# elif 6 < time <=11:
#     print("Hayrli tong!")
# elif 12 < time <= 17:
#     print("Xayrli kun!")
# elif 18 < time < 23:
#     print("Hayrli hech!")
# elif time >= 24:
#     print("Vaqtni to'g'ri kiriting!")
#1)
# user = input("Iltimos, o'z toifangizni kiriting(admin/oddiy: ")
# if user == "admin":
#     user_i = input("Iltimos o'z holatingizni kiriting(faol/faol emas): ")
#     if user_i == "faol":
#         print("Tizimga kira olasiz!")
#     else: print("Tizimga kira olmaysiz!")
# else: print("Tizimga kira olmaysiz!")
#2)
# number = int(input("Istalgan sonni kiriting: "))
# if number % 5 == 0:
#     if number > 0:
#         print("Siz kiritgan son musbat va 5 ga karrali!")
#     elif number < 0:
#         print("Siz kiritgan son manfiy ammo 5 ga karrali!")
#     else:
#         print("Bu son 0 ga teng, u ham 5 ga karrali!")
# else:
#     if number > 0:
#         print("Siz kiritgan son 5 ga karrali emas ammo musbat!")
#     elif number < 0:
#         print("Siz kiritgan son 5 ga karrali emas va manfiy!")
#     else:
#         print("Bu son 0, 5 ga karrali emas bo‘lishi mumkin emas.")
#3) 
# parol = int(input("Iktimos, parolni kiriting: "))
# if parol == 2025:
#     login = int(input("Iltimos, loginni kiriting: "))
#     if login == 20251:
#         print("Tabriklaymiz , siz tizimga kira olasiz!")
#     else: print("Qaytadan urinib ko'ring!")
# else: print("Qaytadan urinib ko'ring!")
#4)
# number = int(input("Istalgan sonni kiriting: "))
# if number % 3 == 0:
#     if number % 2 == 0:
#         print("Siz kiritgan son juft va 3 ga karrali!")
#     elif number % 2 != 0:
#         print("Siz kiritgan son 3 ga karrali ammo juft emas!")
# elif number % 2 == 0:
#     if number % 3 != 0:
#         print("Siz kiritgan son juft ammo 3 ga karrali emas!")
#5)
# phone = input("Telfon raqamingizni kiriting: ")
# if phone.startswith("+998"):
#     if phone[4] == '9':
#         print("Telefon raqam +998 bilan boshlangan va 9 bilan davom etgan!")
#     else:
#         print("Telefon raqam +998 bilan boshlanadi ammo 9 bilan davom qilmaydi!")
# else:
#     print("Telefon raqam +998 bilan boshlanmagan va 9 bilan ham davom etmagan!")
#6)
# age = int(input("Yoshingizni kiriting: "))
# if age >= 18:
#     gender = input("Jinsingizni tanlang(erkak/ayol): ")
#     if gender == "erkak":
#         print("Tizimga xush kelibsiz, janob!")
#     elif gender == "ayol":
#         print("Tizimga xush kelibsiz, janob!")
#     else: print("Jinsingizni to'g'ri kiriting!")
# else: print("Siz tizimga kira olmaysiz!")
#7)
# exam = input("Imtihon topshirdingizmi: ")
# if exam == "ha":
#     ball = int(input("Imtihondan to'plagan ballaringizni kiriting: "))
#     if 56 <= ball < 150:
#         print("Yxshi, lekin hali o'qishingiz kerak!")
#     elif 151 <= ball < 189:
#         print("Ajoyib. Harakatdan to'xtamang!")
#     elif ball < 56:
#         print("Hali ancha bilim olishingiz kerak!")
#     else: print("Balingizni to'g'ri kiriting!")
# elif exam == "yo'q":
#     print("Kelgusida omad tilaymiz!")
#8)
# num1 = int(input("Birinchi sonni kiriting: "))
# num2 = int(input("Ikkinchi sonni kiriting: "))
# if num1 == num2:
#     if num1 > 0:
#         print(f"{num1} - musbat!")
#     elif num1 < 0: 
#         print(f"{num1} - manfiy!")
#     elif num2 > 0:
#         print(f"{num1} - musbat!")
#     elif num2 < 0: 
#         print(f"{num1} - manfiy!")
# else: print("Ikki son teng emas!")
#9)    
# balance = 1000000
# wiv = int(input("Yechmoqchi bo'lgan summangizni kiriting: "))
# if wiv < balance:
#     print(f"Pul hisobingizdan muvaffaqiyatli yechib olndi. Balans: {balance - wiv} so'm.")
# else: print("Hisobingizda mablag' yetarli emas!")
#10)
# num = int(input("Istalgan to'rt xonali sonni kiriting: "))
# if num - 1000 == 0 or num - 1000 > 0 and num < 10000:
#     if num % 2 == 0:
#         print("Siz kiritgan 4 xonali son juft!")
#     else: print("Siz kiritgan 4 xonali son toq!")
# else: print("Siz kiritgan son 4 xonali emas")


#11) xato!!!!!!!!!!!!!!!!!!
# parol = int(input("Parolni kiriting: "))
# parol1 = int(input("Parolni qayta kiriting: "))
# if parol == 202526 and parol1 == 202526 and parol(len) <= 6:
#     print("Siz kiritgan parol tog'ri va uzunligi 6 dan katta!")
# else: print("Parolni qayta kiriting!")


#12)
# enter = input("Siz saytdan ro'yxatdan o'tganmisiz(ha / yo'q): ")
# if enter == "ha":
#     parol = int(input("Parolni kiriting: "))
#     if parol == "2025":
#         print("Saytga kirishingiz mumkin!")
#     else: print("Parolni to'g'ri kiriting!")
# else: print("Iltimos, avval saytdan ro'yxatdan o'ting!")
#13)
# price = int(input("Mahsulot narxini kiriting: "))
# if price > 100000:
#     print(f"Sizda -20% chegirma bor. Siz {price / 5 - price} so'm to'laysiz!")
# else: print(f"Sizda chegirma yo'q. Siz {price} so'm to'laysiz!")
#14)
# year = int(input("Kabisa yilini aniqlamoqchi bo'lgan yilingizni kiriting: "))
# if year / 4 and year % 100 != 0:
#     if year % 400 == 0:
#         print("Siz kiritgan yil kabisa yili!")
# else: print("Siz kiritgan yili kabisa yili emas!")
#15)
# tomon1 = int(input("1-tomonni kiriting: "))
# tomon2 = int(input("2-tomonni kiriting: "))
# tomon3 = int(input("3-tomonni kiriting: "))
# tomon4 = int(input("4-tomonni kiriting: "))

# if tomon1 == tomon3 and tomon2 == tomon4:
#     print("Bu shakl to‘rtburchak bo‘lishi mumkin!")
# else:
#     print("Bu shakl to‘rtburchak bo‘la olmaydi!")
#16)
# email = input("Emailingizni kiriting: ")
# if email in "@" and email.endswith(".com"):
#     print("Sizning emailingiz qabul qilindi!")
# else: print("Emailni to'g'ri kiriting!")
#17)
# game = input("O'yinni davom ettirasizmi: ")
# if game == "ha":
#     print("Tanlovingiz uchun rahmat! O'yinni davom ettirishingiz mumkin!")
# elif game == "yo'q":
#     ask = input("Tanlovingizni o'ylab ko'ring. O'yinni haqiqattan ham tugatishni xohlaysizmi: ")
#     if ask == "ha":
#         print("Biz bilan bo'lganingiz uchun rahmat! Sizni yana kutamiz!")
#     elif ask == "yo'q":
#         print("O'yinda qolganingiz uchun rahmat!")
#     else: print("Tanlovingiz uchun rahmat!")
# else: print("Tanlovingiz uchun rahmat!")
#18)
# ask = int(input("Saylovda ishtirok etishdan oldin yoshingizni kiriting: "))
# if ask >= 18:
#     ask2 = input("Sizda ID karta bormi(ha / yo'q): ")
#     if ask2 == "ha":
#         print("Tabriklaymiz. Siz saylovda qatnasha olasiz!")
#     elif ask2 == "yo'q":
#         print("Sizda saylovda qatnasha olmaysiz!")
#     else: print("Biz faqat ha yoki yo'q javobini qabul qilamiz!")
# else: print("Siz saylovda qatnasha olmaysiz!")
#19)
# ask = int(input("Avtomabil haydashdan oldin yoshingizni kiriting: "))
# if ask >= 18:
#     ask2 = input("Sizda hujjat bormi(ha / yo'q): ")
#     if ask2 == "ha":
#         print("Tabriklaymiz. Siz mashina hayday olasiz!")
#     elif ask2 == "yo'q":
#         print("Siz mashina hayday olmaysiz!")
#     else: print("Biz faqat ha yoki yo'q javobini qabul qilamiz!")
# else: print("Siz mashina hayday olmaysiz!")
#20)
# num1 = int(input("Birinchi sonni kiriting: "))
# num2 = int(input("Ikkinchi sonni kiriting: "))
# num3 = int(input("Uchinchi sonni kiriting: "))
# if num1 > num2 and num1 > num3:
#     if num1 % 2 == 0:
#         print(f"Siz kiritgan {num1} soni eng katta va juft!")
#     else: print(f"Siz kiritgan {num1} soni eng katta lekin toq!")
# elif num2 > num1 and num2 > num3:
#     if num2 % 2 == 0:
#         print(f"Siz kiritgan {num2} soni eng katta va juft!")
#     else: print(f"Siz kiritgan {num2} soni eng katta lekin toq!")
# elif num3 > num1 and num3 > num2:
#     if num3 % 2 == 0:
#         print(f"Siz kiritgan {num3} soni eng katta va juft!")
#     else: print(f"Siz kiritgan {num3} soni eng katta lekin toq!")
# else: print("Siz kiritgan uchalla son ham teng!")

#for sikli
#1)
# for son in range(1, 11):
#     print(son)
#2)
# for text in range(5):
#     print("Salom, Dasturchi!")
#3)
# for son in range(1 , 21):
#     if son % 2 == 0:
#         print(son)
#4)
# for son in range(1 , 101):
#     if son % 2 == 1:
#         print(son)
#6)
# n = int(input("n sonini kiriting: "))
# y = 0
# for i in range(1 , n + 1):
#     y += i
# print("1 dan", n ,"gacha bo'lgan sonlar yig'indisi: ", y)
#7)
# son = int(input("Istalgan sonni kiriting: "))
# for son in range(0, son):
#     son += 1
#     print(son, "ning kvadrati =", son ** 2)
#8)
# word = "Python"
# for i in word:
#     print(i)
#9)
# n = int(input("n sonini kiriting: "))
# for i in range()
#10)
# n = int(input("n sonini kiriting: "))
# faktorial = 1
# for i in range(1, n + 1):
#     faktorial *= i
# print(f"{n} sonining faktoriali: {faktorial}")
#11)
# n = int(input("Nechta son: "))
# summa = 0
# for i in range(1,n+1):
#     son = float(input(f"{i} - sonni kiriting:"))
#     summa +=son
#     orta_arifmetik = summa / n
# print(orta_arifmetik)
#12)
# import random
# sonlar = []
# for i in range(10):
#     tasodifiy_son = random.randint(0, 100)
#     sonlar.append(tasodifiy_son)
# print("Tasodifiy sonlar ro‘yxati:", sonlar)
#13)

#17)
# n = int(input("Kvadrat o'lchamini kiriting: "))
# for i in range(n):
#     for j in range(n):
#         print("*" , end = "")
# print()
#18)
# n = int(input("Kvadrat o'lchamini kiriting: "))
# for i in range(n , 0 , -1):
#     print(i*"*" , end = "\n")
#     print(i*"*" , end = "\n")