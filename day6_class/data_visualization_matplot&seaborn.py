import matplotlib.pyplot as plt
import numpy as np


# """Below code is show only one plot in the figure"""
# x = [1,2,3,4,5]
# y = [2, 3, 5, 7, 11]
# x1=[20,40,60,80,100]
# y1=[10,20,30,40,50]
# fig, (a,b)=plt.subplots(2,1)
#
# a.plot(x,y)
# b.plot(x1,y1)
#
# fig, (ax1,ax2,ax3)=plt.subplots(3,1)
# ax1.plot(x1,y,marker="o",linestyle="--",color="green")
# ax1.set_xlabel("jizani")
# ax1.set_ylabel("mike")
# ax1.set_title("sahaya nithya")
# ax2.plot(x,y1,color="blue",marker="x",linestyle="-",xlab="pig")
# ax3.plot(y,x1)
#
# plt.suptitle("testing five")
# fig.tight_layout()
# fig.savefig("graph1.png")
#
# plt.show()
names=["ronaldo","dhoni","virat","messi"]
num=[100,90,50,70]
col=["red","yellow","green","blue"]
plt.bar(names,num,color="yellow")
plt.savefig("bar1")
plt.show()
data=np.random.randn(100)
print(data)
print(type(data))
plt.hist(data,color="yellow",edgecolor="black",bins=100)
plt.savefig("hist1")
plt.show()
data1=4*data + np.random.rand(100)
print(data1.ndim)
print(data1)
plt.hist(data1,color="green",edgecolor="white")
plt.savefig("mike2")
plt.show()
plt.scatter(data,data1)

plt.savefig("mike1")
plt.show()

ex=(0,0.1,0,0)
plt.pie(num,labels=names,autopct="%1.2f%%",colors=col,explode=ex)
plt.savefig("pie1")
plt.show()


