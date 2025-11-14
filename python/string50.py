#1)
# name = input("Ismingizni kiriting: ")
# print(name)
#2)
# name = input("Ismingizni kiriting: ")
# print(name.upper())
#3)
# name = input("Ismingizni kiriting: ")
# print(name.lower())
#4)
# name = input("Ismingizni kiriting: ")
# print(name.title())
#5)
# name = input("Ismingizni kiriting: ")
# surname = input("Familiyangizni kiriting: ")
# print(name + surname)
#6)
# name = input("Ismingizni kiriting: ")
# print(len(name))
#7)
# name = input("Ismingizni kiriting: ").capitalize()
# if name.endswith("bek"):
#     print(f"Sizning ismingiz {name} va bek bilan tugaydi!")
# else: print("Sizning ismingiz bek bilan tugamaydi!")
#8)
# name = input("Ismingizni kiriting: ").capitalize()
# if name.startswith("A"):
#     print(f"Sizning ismingiz {name} va a bilan boshlanadi!")
# else: print("Sizning ismingiz a bilan boshlanmaydi!")
#9)
# name = input("Ismingizni kiriting: ").capitalize()
# if name.endswith("jon"):
#     print(f"Sizning ismingiz {name} va jon bilan tugaydi!")
# else: print("Sizning ismingiz jon bilan tugamaydi!")
#10)
# name = input("Ismingizni kiriting: ")
# print(name.count("a"))
#11)
# city = input("Shahringiz nomini kiriting: ").title()
# print(city)
#12)
# text = input("Sistalgan turdagi matnni kiriting: ")
# block = text.split()
# text.try = "".join
# print(text)
#13)
# matn = input("Istalgan turdagi matnni kiriting: ")
# yangi_matn = matn.replace(",", ".")
# print(yangi_matn)
#14)
# number = input("Telefon raqamingizni kiriting: ")
# if number.startswith("+998"):
#     print("Sizning raqamingiz o'zbekistonga tegishli!")
# else: print("Sizning raqamingiz chet el davlatlariga tegishli!")
#15)
# email = input("Emailingizni kiriting: ")
# if email in "@":
#     print("Emailingizda @ mavjud!")
# else: print("Emailingizda @ mavjud emas!") 
#16)
# text = input("Matnni kiriting: ")
# print(text[-1] + text[-2] + text[-3])
#17)
# text = input("Matnni kiriting: ")
# print(text[0:5])
#18)
# name = input("Ismingizni kiriting: ").title()
# surname = input("Familiyangizni kiriting: ").title()
# print(f"Xush kelibsiz, {name}{" "}{surname}!")
#19)
# matn = input("Matnni kiriting: ")
# teskari = matn[::-1]
# print("Sizning matningiz teskari o'girildi:", teskari)
#20)
# text = input("Matnni kiriting: ").upper()
# unli = "AEUIO"
# sanash = 0
# for harf in text:
#     if harf in unli:
#         sanash += 1
# print(f"Siz kiritigan matnda {sanash} ta unli harf bor!")
#21)
# card = input("Kartangizning oxirgi to'rtta raqamini kiriting: ")
# if len(card) > 4:
#     print("Faqat oxirgi 4 ta raqamni kiriting!")
# else: print(f"**** **** **** {card}")
#22)

#23)
# parol = input("Parolni kiriting: ")
# if len(parol) < 8:
#     print("Parol uzunligi kamida 8 ta belgidan iborat bo'lishi kerak!")
# else: print("Parolingiz qabul qilindi!")
#24)
# text = input("Matn kiriting: ")
# if text == text.lower():
#     print("Matn qabul qilindi!")
# else: print("Matn faqat kichik harflardan iborat bo'lishi kerak!")
#25)
# text = input("Matn kiriting: ")
# if any(harf.islower() for harf in text) and any(harf.isupper() for harf in text):
#     print("Matnda katta va kichik hafrlar aralashgan!")
# else: print("Matnda katta va kichik hafrlar aralashgan!")
#26)
# text = input("Matn kiriting: ").rstrip()
# print(text)
#27)
# text = input("Matn kiriting: ").lstrip()
# print(text)
#28)
# matn = input("Matn kiriting: ")
# birinchi_soz = matn.split()[0]
# print("Birinchi so‘z:", birinchi_soz)
#29)
# matn = input("Matn kiriting: ")
# oxirgi_soz = matn.split()[-1]
# print("Birinchi so‘z:", oxirgi_soz)
#30)
# ism = input("Ismingni kiriting: ")
# familya = input("Familiyangizni kiriting: ")
# print(f"{ism} {familya[0]}")
#31)
# text = input("Matn kiriting: ")
# if text.endswith("."):
#     print("Sizning matningiz nuqta bilan tugagan!")
# else: print("Sizning matningiz nuqta bilan tugamagan!")
#32)
# text = input("Matn kiriting: ")
# print("Siz kiritgan matndagi so'zlar soni:" , text.count(" ") + 1)
#33)
# text = input("Matn kiriting: ")
# print(f"*** {text} ***")
#34)

#35)

#36)
# matn = input("Ismingizni kiriting: ")
# teskari = matn[::-1]
# if teskari == matn:
#     print("Sizning ismingiz palindrom!")
# else:
#     print("Sizning ismingiz teskari o'girildi:", teskari)
#37)
# number = input("Telefon raqamingizni kiriting: ")
# if number.isdigit():
#     print("Sizning raqamingiz qabul qilindi!")
# else:
#     print("Sizning raqamingiz qabul qilinmadi. U faqat raqamlardan iborat bo'lishi kerak!")
#38)
# parol = (input("Parolni kiriting: "))
# if parol in " ":
#     print("Siz kiritgan parolda bo'sh joy bor. Qaytadan kiriting!")
# else: print("Siz kiritgan parolda bo'sh joy yo'q!")
#39)
# text = input("Matn kiriting: ")
# print(text.replace("@" , ""))
#40)
# text = input("Matn kiriting: ")
# print(text.replace(" " , "-"))
#41)
# name = input("Ismingizni kiritng: ")
# print(f"😊 {name} 👌")
#42)

#43)
# matn = input("matn:")
# bosh_harflar = []
# for i in matn:
#     if i.isupper():
#         bosh_harflar.append(i)
# matn_shakli = "".join(bosh_harflar)
# print(matn_shakli)
# ism = input("Ismingizni kiriting: ")
# familya = input("Familiyangizni kiriting: ")
# print(ism[0], familya[0])
#45)
# matn = input("matn:")
# unlilar = "aioeuo'"
# unli_harflar = []
# for i in matn:
#     if i not in unlilar:
#         unli_harflar.append(i)
# matnga_qaytish  = "".join(unli_harflar)
# print(matnga_qaytish)
#46)

#47)
# javob = input("Iltimos, 'Ha' yoki 'Yo‘q' deb yozing: ")
# if javob == "Ha" or javob == "Yo‘q":
#     print("Javob qabul qilindi!")
# else:
#     print("Noto‘g‘ri javob kiritdingiz.")
#48)
import re
matn = input("input:")
royhat  = matn.split()
len(matn)

#49)


#50)
# link = input("Sayt linkini kiriting: ")
# if link in "https://" or "http://":
#     print("Siz kiritgan sayt havolasi qabul qilindi!")
# else: print("Siz kiritgan sayt havolasi qabul qilinmadi!")

