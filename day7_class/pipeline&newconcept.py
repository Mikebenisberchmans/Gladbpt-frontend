from sklearn.preprocessing import MinMaxScaler
from sklearn.compose import ColumnTransformer
import pandas as pd

my_data = {"Score": [10,20, 300, 40, 50] ,
"Average": [0.1,0.2,0.3,0.4,0.5]}
df = pd. DataFrame (my_data)
print (df)
col_transformer = ColumnTransformer([("minmax",MinMaxScaler(),["score"])],remainder="passthrough")
min_max_scaler = col_transformer.fit_transform(df)
print(type(min_max_scaler))
df_min_max_scaler = pd. DataFrame(min_max_scaler,columns=df.columns)
print(df_min_max_scaler)

final_data = pd.concat([df,df_min_max_scaler],axis=1)
