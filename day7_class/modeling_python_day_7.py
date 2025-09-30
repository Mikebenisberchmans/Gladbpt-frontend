"""handling data"""
import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder
from sklearn.preprocessing import OneHotEncoder

my_data={"name":["mike","mohan","vijay",None],"age":[18,19,None,10]}
df=pd.DataFrame(my_data)
print(df)
df.fillna(df["age"].mean(),inplace=True)
print(df)
mine={"job":["begger","cleaneer","sweeper",None],"names":["naveen","gokul",None,"mohan"]}
df1=pd.DataFrame(mine)
# df1["names"].fillna(method="ffill",inplace=True)
print(df1)
# df1.fillna({"names":df1["names"]},method="ffill",inplace=True)
# print(df1)
label_encoder=LabelEncoder()
df1["new_job"]=label_encoder.fit_transform(df1["job"])
print(df1)
df1["age"]=df1["names"].map({"naveen":12,"mohan":23,"gokul":11})
print(df1)
mean=df1["age"].mean()
# df1["age"].fillna(mean ,inplace=True)
print(df1)
dat={"degree":["master","bachelor","py","master","master","phd","bachelor","phd","master"],"name":["mike","mohan","naveen","jayaram","sorna","richard","loki","jiza","berk"]}
df2=pd.DataFrame(dat)
print(df2)
encoded_df2=pd.get_dummies(df2["degree"],prefix="changed_")
print(encoded_df2)
final_df2=pd.concat([df2,encoded_df2],axis=1)
print(final_df2)
one_hot_encoder=OneHotEncoder(sparse_output=False)
encoded_df2=one_hot_encoder.fit_transform(df2[["degree"]])
print(encoded_df2)
df_encoded=pd.DataFrame(encoded_df2,one_hot_encoder.get_feature_names_out(["degree"]))
print(df_encoded)
final_ohe=pd.concat([df2,df_encoded],axis=1)
print(final_ohe)
"""get dummies and one hot encoder is for categorization whereas label encoder and map function is for givving a string value for string """