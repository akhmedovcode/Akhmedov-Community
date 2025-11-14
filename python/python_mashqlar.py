#1)
# print(1 + 2)
#3)
# print(4 - 2)
#4)
# print(10 / 2)
#5)
# print(3**2)
#6)
# print(3**3)
#7)
# son1 = int(input("Birinchi sonni kirting: "))
# son2 = int(input("Ikkinchi sonni kirting: "))
# son3 = int(input("Uchinchi sonni kirting: "))
# if son1 > son2 and son3:
#     print(f"Bu yerda eng katta son: {son1}")
# elif son2 > son1 and son3:
#     print(f"Bu yerda eng katta son: {son2}")
# elif son3 > son1 and son2:
#     print(f"Bu yerda eng katta son: {son2}")
# else: print("Uchchala son teng!")
#8)
# son1 = int(input("Birinchi sonni kirting: "))
# son2 = int(input("Ikkinchi sonni kirting: "))
# son3 = int(input("Uchinchi sonni kirting: "))
# if son1 < son2 and son3:
#     print(f"Bu yerda eng kichik son: {son1}")
# elif son2 < son1 and son3:
#     print(f"Bu yerda eng kichik son: {son2}")
# elif son3 < son1 and son2:
#     print(f"Bu yerda eng kichik son: {son2}")
# else: print("Uchchala son teng!")
#11)
# son = (input("Son kiriting: "))
# print(son[-1])
#12)
# son = input("Son kiriting: ")
# yigindi = 0
# for raqam in son:
#     yigindi += int(raqam)
# print(f"{son} sonining raqamlar yig'indisi: {yigindi}")
#13)
# son = input("Son kiriting: ")
# print(son * 5)
#14)
# print((1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 + 10) / 10)
#15)
# son = input("Son kiriting: ")
# if son > 0:
#     print(f"{son} - musbat!")
# elif son < 0:
#     print(f"{son} - manfiy!")
# else: print("Siz kiritgan son musbat ham manfiy ham emas!")
#16)
# for i in range(50):
#     if i % 2 == 0:
#         print(i)
#17)
# for i in range(50):
#     if i % 2 != 0:
#         print(i)
#19)
# son = int(input("Son kiriting: "))
# faktorial = 1
# for i in range(1, son + 1):
#     faktorial *= i
# print(f"{son} sonining faktoriali: {faktorial}")
#20)
# son = int(input("Son kiriting: "))
# print(son**(1/2))
#21)
# ism = input("Ismingizni kiriting: ")
# print(f"Salom, {ism}!")
#22)
# matn = input("Matn kiriting: ")
# print(len(matn))
#23)
# matn = input("Matn kiriting: ")
# print(matn[0])
#24)
# matn = input("Matn kiriting: ")
# print(matn[-1])
#25)
# matn = input("Matn kiriting: ").lower()
# print(matn)
#26)
# matn = input("Matn kiriting: ").upper()
# print(matn)
#27)
# matn = input("Matn kiriting: ")
# birinchi_soz = matn.split()[0]
# print("Birinchi so‘z:", birinchi_soz)
# #28)
# matn = input("Matn kiriting: ").lower()
# matn_count = matn.count("a")
# print(matn_count)
#29)
# matn = input("Matn kiriting: ")
# if len(matn) < 5:
#     print(matn)
# else: print(matn[0:6])
#30)
# matn = input("Matn kiriting: ")
# if len(matn) < 3:
#     print(matn)
# else: print(matn[-1:-3])
#31)
# matn = input("Matn kiriting: ").lower()
# if matn in "ha":
#     print("Siz kiritgan matnda 'ha' qatnashgan!")
# else: print("Siz kiritgan matnda 'ha' qatnashmagan!")
#32)
# fi = input("Ism va familyangizni kiriting: ").title()
# bolaklsh = fi.split()
# print(f"Sizning ismingiz: {bolaklsh[0]}, sizning familyangiz: {bolaklsh[1]}")
#33)
# matn = input("Ismingizni kiriting: ")
# teskari = matn[::-1]
# print(teskari)
#34)
# word_1 = input("Birinchi so'zni kiriting: ")
# word_2 = input("Ikkinchi so'zni kiriting: ")
# print(word_1 + word_2)
#35)
# text = input("Matn kiriting: ").lstrip().rstrip()
# print(len(text.strip()))
#36)
# text = input("Matn kiriting: ").capitalize()
# print(text)
#37)
# matn = input("matn:")
# unlilar = "aioeuo'"
# unli_harflar = []
# for i in matn:
#     if i not in unlilar:
#         unli_harflar.append(i)
# matnga_qaytish  = "".join(unli_harflar)
# print(matnga_qaytish)
#38)
# matn = input("Matn kiriting: ").lower()
# unlilar = "aeiou"  # inglizcha unlilar (agar o‘zbekcha kerak bo‘lsa, quyida yozaman)
# natija = ""
# for harf in matn:
#     if harf.isalpha() and harf not in unlilar:
#         natija += harf
# print("Undosh harflar:", natija)
#39)
# ism = input("Ismingizni kiriting: ")
# print(f"Siz kiritgan matnda {len(ism)} ta harf bor!")
#40)
# matn = input("Matn kiriting: ")
# bolaklash = matn.split()
# eng_uzun = max(sorted(bolaklash , key=len))
# print(eng_uzun)