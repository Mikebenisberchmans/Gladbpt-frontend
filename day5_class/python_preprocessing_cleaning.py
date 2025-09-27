
import pandas as pd
import os
import matplotlib.pyplot as plt
pd.set_option("display.max_columns",None)
data={
    "name":["mike","mohan",None,"naveen"],
    "age":[12,13,14,None]
}
my_df=pd.DataFrame(data)
my_df['name'].replace({"mike":""})
print(my_df)
print(type(my_df))
empty_df=my_df.isnull()
print(empty_df)

fil_df=my_df.fillna(20)

print(fil_df)

# my_df.to_csv("day5_cleaning.csv")
# print (os.getcwd())
df=pd.read_csv("pokedex_(Update_05.20).csv")
print(df)
empty_df=df.isnull()
print(empty_df["against_fairy"])

# df2=pd.read_csv("pokedex_(Update.04.20).csv")
# # print(df2)
# fill_df2=df2.fillna(300)
# # print(fill_df2)
# drop_df2=df2.dropna()
# # print(drop_df2)
# drp_my_df=my_df.dropna(axis=1,how="all")
# print(drp_my_df)
# drp_df2=df2.dropna(axis=0,how="any")
# # print(drp_df2)
# mik=pd.read_csv(r"C:\Users\benij\PycharmProjects\pythonjiza\mikal.csv")
# print(mik)

fig=plt.figure()

fig.tight_layout()
ax=fig.add_subplot(111)
ax.bar(df["attack"],df["species"],color="yellow")
plt.suptitle="bar"
plt.show()

