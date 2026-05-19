
no=0
for i in range(9):
    s = int(input())
    t = int(input())
    if (s >= 5) or (t < 12):
        print("YES")
    else:
        print("NO")
        no+=1
print(no)