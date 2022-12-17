# -*- coding: utf-8 -*-
"""Previa AF.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1xYfwZ2atJ5x7A3mzLqw3Oz5Xu64cddZA

Nome: Gabriel Silva Lamboglia   


RGM: 20066490
"""

!pip install xlrd==1.2.0 #Instalando dependencia do pandas xlrd na versao 1.2.0

#Realizando importacao da tabela badededados.xls

import pandas as pd  #Importando biblioteca de leitura de tabelas do excel pandas

tabela = pd.read_excel('basededados.xls') #importando tabela basededados.xls

display(tabela) #Mostrando os dados da tabela

#Removendo as colunas Codigo EAN,Unnamed: 1 e DATA da tabela

tabela = tabela.drop(["Codigo EAN", "Unnamed: 1", "DATA"], axis=1)

display(tabela) #Mostrando os dados da tabela

#Converterdo coluna Radio para numerico

tabela["Radio"] = pd.to_numeric(tabela["Radio"], errors="coerce")

print(tabela.info()) #Mostrando as informacoes de cada linha e coluna da tabela

#Removendo todos os dados que contem Nan

tabela = tabela.dropna(how="all", axis=1) #Removendo colunas que todos os elementos possuem NaN

tabela = tabela.dropna(how="any", axis=0) #Removendo linhas que qualquer elemento possua NaN

#Mostrando o grafico de correlacao da tabela

import seaborn as sns #Importando biblioteca para criacao de graficos baseado no matplotlib o seaborn
import matplotlib.pyplot as plt #Importando biblioteca para criacao de graficos o matplotlib

#Reproduzindo o grafico de correlacao da tabela
sns.heatmap(tabela.corr(), annot=True, cmap="Wistia")
plt.show()

#Realizando o treino dos dados das colunas da tabela

y = tabela['Vendas'] #Armazenando em y apenas dados da coluna Vendas

x = tabela.drop(['Vendas', 'Total Investido'], axis=1) #Armazenando em x todas as colunas com exessao de Vendas e Total Investido

#Importando da biblioteca sklearn a biblioteca para treinamento de dados train_test_split 
from sklearn.model_selection import train_test_split 

#Realizando o treino dos dados armazenado em x e y
x_treino, x_teste, y_treino, y_teste = train_test_split(x, y, test_size=0.25)

#Realizando treino dos dados da tabela com os modelos de predicao 

#Importando da biblioteca sklearn as 2 bibliotecas de modelo de preditiva LinearRegression e RandomForestRegressor
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor

modelo_RL = LinearRegression() #Armazenando o metodo de analise preditica que utiliza Regressao Linear
modelo_AD = RandomForestRegressor() #Armazenando o metodo de analise preditica que utiliza Arvore de Decisao

modelo_RL.fit(x_treino, y_treino)#Realizando o treino dos dados armazenados em x_treino e y_treino utilizando metodo de Regressao Linear
modelo_AD.fit(x_treino, y_treino)#Realizando o treino dos dados armazenados em x_treino e y_treino utilizando metodo de Arvore de Decisao

print('Modelos abaixo ja treinados:')

#Realizando a previsao dos dados da tabela 

previsao_RL = modelo_RL.predict(x_teste) #Realizando a previsao dos dados treinados pelo modelo de Regressao Linear
previsao_AD = modelo_AD.predict(x_teste)  #Realizando a previsao dos dados treinados pelo modelo de Arvode de Decisao

from sklearn import metrics #Importando biblioteca para reproduzir os dados das previsoes acima a metrics

print(metrics.r2_score(y_teste, previsao_RL))#Reproduzindo os dados do modelo Regressao Linear
print(metrics.r2_score(y_teste, previsao_AD))#Reproduzindo os dados do modelo Arvore de Decisao

#Criando uma tabela para armazenar os dados das previsoes acima

tabela_aux = pd.DataFrame() #Criando uma tabela chamada tabela_aux
tabela_aux['y_teste'] = y_teste #Armazenando os dados da variavel y_teste na coluna da tabela_aux t_teste
tabela_aux['Previsoes da Regressao Linear'] = previsao_RL #Armazenando os dados da variavel previsao_RL na coluna da tabela_aux Previsao da Regressao Linear
tabela_aux['Previsoes da Arvore de Decisao'] = previsao_AD #Armazenando os dados da variavel previsao_AD na coluna da tabela_aux Previsao da Arvore de Decisao


#Definir tamanho do grafico 
plt.figure(figsize=(10,5))

#Mostrando grafico da tabela_aux
sns.histplot(data=tabela_aux)
plt.show()

#Realizando Analise de uma nova tabela 

nova_tabela = pd.read_excel('dadosprevisaocurta.xls')#Importando a tabela dadosprevisaocurta.xls

display(nova_tabela) #Mostrando dados da tabela

previsao_AD_tabelanova = modelo_AD.predict(nova_tabela)#Realizando previsao da tabela nova usando modulo de Arvore de Decisao 

print('Previsao da Nova Tabela')
print(previsao_AD_tabelanova)#Mostrando a previsao da nova tabela

#Reproduzindo o grafico da tabela apos realisar o treino dos dados com o modelo de Arvore de Decisao

sns.barplot(x=x_treino.columns, y=modelo_AD.feature_importances_)
plt.show()