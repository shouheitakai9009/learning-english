read_file = open("./words_list.txt", "r")
read_txt = read_file.read()
read_file.close()

word_list = [word.strip().replace("\n", "") for word in read_txt.split(",")]  # 各単語の前後の空白を取り除く
will_write_txt = ",".join(set(word_list))
will_write_txt = will_write_txt.strip()  # 最終的な文字列の前後の空白を取り除く

write_file = open("./words_list.txt", "w")
write_file.write(will_write_txt)
write_file.close()