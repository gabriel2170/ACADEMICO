# -*- coding: utf-8 -*-
"""analise-preditiva-de-series-temporais-python.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1IjmKAPu8_dAgwZoz38CfbcdxQmzgFwgs

Este artigo, tem como objetivo a explanação do uso do método de previsão de séries temporais, o ARIMA, bem como abordagem de técnicas de limpeza de dados e visualização utilizando o Pyplot.


Neste kernel, usei fontes de dados multiplas que são operações de bombardeio aéreo e condições climáticas na Segunda Guerra Mundial. Após esse ponto, usarei a sigla ww2 para a 2ª Guerra Mundial. Começaremos com a descrição e a limpeza dos dados, depois visualizaremos nossos dados para entender melhor. Esses processos podem ser chamados de AED (Análise Exploratória de Dados). Depois disso, focaremos na previsão de séries temporais para prever quando as operações de bombardeio são realizadas. Para previsão de séries temporais, usaremos o método ARIMA, que será um tutorial.

Entendendo o ARIMA
Em estatística e econometria, particularmente em análise de séries temporais, um modelo auto-regressivo integrado de médias móveis (autoregressive integrated moving average ou ARIMA, na sigla em inglês) é uma generalização de um modelo auto-regressivo de médias móveis (ARMA). Ambos os modelos são ajustados aos dados da série temporal para entender melhor os dados ou para prever pontos futuros na série. Modelos ARIMA são aplicados em alguns casos em que os dados mostram evidências de não estacionariedade, em que um passo inicial de diferenciação (correspondente à parte "integrada" do modelo) pode ser aplicado uma ou mais vezes para eliminar a não estacionariedade.

 A parte auto-regressiva (AR) do modelo ARIMA indica que a variável evoluinte de interesse é regressada em seus próprios valores defasados, isto é, anteriores. A parte de média móvel (MA) indica que o erro de regressão é na verdade uma combinação linear dos termos de erro, cujos valores ocorreram contemporaneamente e em vários momentos no passado. A parte integrada (I) indica que os valores de dados foram substituídos com a diferença entre seus valores e os valores anteriores e este processo diferenciador pode ter sido realizado mais de uma vez. O propósito da cada uma destas características é fazer o modelo se ajustar aos dados da melhor forma possível.

Nome: Gabriel Silva Lamboglia                    RGM: 20066490
"""

#instalando biblioteca chart_studio

!pip install chart_studio

#O Ambiente utilizado é Python 3 que vem com muitas bibliotecas de análise úteis 
#instaladas

#importando bibliotecas abaixo para utilizar no codigo abaixo 

import numpy as np # para algebra linear
import pandas as pd # processamento de dados, arquivos CSV I/O (expl: pd.read_csv)
import seaborn as sns  #biblioteca de visualização
import matplotlib.pyplot as plt  #biblioteca de visualização
import chart_studio.plotly as py #biblioteca de visualização
from plotly.offline import init_notebook_mode, iplot # modo offline do plotly
init_notebook_mode(connected=True) 
import plotly.graph_objs as go # objeto de gráfico do plotly

# Os arquivos de dados de entrada estão disponíveis no diretório "/home/nelson/Documents/Script Python/Time Series Prediction Tutorial with EDA"
# deveram colocar o caminho onde estará os arquivos CVS disponibilizados

#importando biblioteca os para ser utilizada para reproduzir o conteudo das tabelas csv
import os
# no código abaixo como saída terão os arquivos contidos na pasta

#listando os arquivos armazenados no diretorio em questao 

print(os.listdir("../input/"))

# importar bibliotecas de avisos
import warnings

#ignorar filtros

#o codigo abaixo serve para ignorar avisos que seriam reproduzidos , interrompendo a execucao do codigo
warnings.filterwarnings("ignore") # Se houver um aviso após alguns códigos, 
#isso nos evitará vê-los.

# estilos de plots. o ggplot é um dos estilos mais usados.
# todos os resultados que você escreve no diretorio atual são salvos como saída

#o codigo abaixo define um estilo para ser utilizado no grafico 
plt.style.use('ggplot')

"""Carregar os dados.
Como mencionei na introdução, usei várias fontes de dados.
Operações de bombardeio aéreo na Segunda Guerra Mundial
Resumindo, esses dados incluem operações de bombardeio. Por exemplo, os EUA que usam a bomba do aeroporto de Ponte Olivo na Alemanha (Berlim) com aeronaves A36 em 1945.
Condições climáticas na Segunda Guerra Mundial
Resumindo, condições climáticas durante a segunda guerra mundial. Por exemplo, de acordo com a estação meteorológica da cidade de George Town, a temperatura média é 23,88 em 01/07/1942.
Este conjunto de dados possui 2 subconjuntos. O primeiro inclui localizações de estações meteorológicas como país, latitude e longitude.
O segundo inclui temperaturas mínimas, máximas e médias medidas de estações meteorológicas
"""

#datas de bombardeios

#importando tabela operations_dataset.csv
aerial = pd.read_csv("../input/operations_dataset.csv")

# primeiros dados meteorológicos que incluem locais como país, latitude e longitude.

#importando tabela Weather_Station_Locations_dataset.csv
weather_station_location = pd.read_csv("../input/Weather_Station_Locations_dataset.csv")
# Dados climáticos secundários que incluem temperaturas mínimas, máximas e médias medidas

#importando tabela Summary_of_Weather_dataset.csv
weather = pd.read_csv("../input/Summary_of_Weather_dataset.csv")

"""Descrição de dados
Explico apenas os recursos de dados que usaremos neste kernel.
Bombardeio aéreo Descrição dos dados:
 - Data da Missão: Data da Missão
 - Teatro de Operações: região em que operações militares ativas estão em andamento; "o exército estava em campo aguardando ação"; Exemplo: "ele serviu no Vietnã por três anos"
 - País: País que faz missão ou operação como EUA
 - Força Aérea: Nome ou ID da unidade da Força Aérea como 5AF
 - Série de aeronaves: modelo ou tipo de aeronave como B24
 - Indicativo: Antes do ataque à bomba, mensagem, código, anúncio ou sintonia transmitida por rádio.
 - Base de decolagem: nome do aeroporto de decolagem como o Ponte Olivo Airfield
 - Local da decolagem: região da decolagem Sicília
 - Latitude de decolagem: latitude da região de decolagem
 - Longitude de decolagem: Longitude da região de decolagem
 - País de destino: país de destino como a Alemanha
 - Segmentar cidade: segmente cidade como Berlim
 - Tipo de destino: tipo de destino como área da cidade
 - Indústria-alvo: alvo industy como cidade ou urbano
 - Prioridade de destino: segmente como 1 (a maioria)
 - Latitude do alvo: latitude do alvo
 - Longitude alvo: Longitude alvo
 
Descrição dos dados da condição climática:
 Localização da estação meteorológica:
  - WBAN: Número da estação meteorológica
  - NAME: nome da estação meteorológica
  - ID DO ESTADO / PAÍS: acrônimo de países
  - Latitude: latitude da estação meteorológica
  - Longitude: Longitude da estação meteorológica

Clima:
 - STA: número da estação meteorológica (WBAN)
 - Data: Data da medição da temperatura
 - MeanTemp: temperatura média
 
Limpeza de Dados
 Os dados do bombardeio aéreo incluem muito valor de NaN. Em vez de usá-los, ignoro alguns valores de NaN. Ele não apenas remove a incerteza, mas também facilita o processo de visualização
 - Ignorar países que são NaN
 - Ignorar se a longitude alvo for NaN
 - Ignorar se a longitude da decolagem for NaN
 - Descartar recursos não utilizados
 
Os dados da condição climática não precisam de limpeza. De acordo com a análise e visualização exploratória de dados, escolhi um determinado local para examinar mais profundamente. No entanto, vou colocar as variáveis de dados no que uso apenas.
"""

# ignorar países que são NaN

# o codigo abaixo filtra os campos de paises que estao como NaN e ignora eles da leitura da tabela
aerial = aerial[pd.isna(aerial.Country)==False]

# Ignorar se a longitude alvo for NaN

# o codigo abaixo filtra os campos de longitude alvo que estao como NaN e ignora eles da leitura da tabela
aerial = aerial[pd.isna(aerial['Target Longitude'])==False]

# Ignorar se a longitude da decolagem for NaN

# o codigo abaixo filtra os campos de longitude da decolagem que estao como NaN e ignora eles da leitura da tabela
aerial = aerial[pd.isna(aerial['Takeoff Longitude'])==False]

# Descartar recursos não utilizado

#definindo uma lista de campos que seram excluidos da tabela na leitura 
drop_list = ['Mission ID','Unit ID','Target ID','Altitude (Hundreds of Feet)','Airborne Aircraft',
             'Attacking Aircraft', 'Bombing Aircraft', 'Aircraft Returned',
             'Aircraft Failed', 'Aircraft Damaged', 'Aircraft Lost',
             'High Explosives', 'High Explosives Type','Mission Type',
             'High Explosives Weight (Pounds)', 'High Explosives Weight (Tons)',
             'Incendiary Devices', 'Incendiary Devices Type',
             'Incendiary Devices Weight (Pounds)',
             'Incendiary Devices Weight (Tons)', 'Fragmentation Devices',
             'Fragmentation Devices Type', 'Fragmentation Devices Weight (Pounds)',
             'Fragmentation Devices Weight (Tons)', 'Total Weight (Pounds)',
             'Total Weight (Tons)', 'Time Over Target', 'Bomb Damage Assessment','Source ID']

#excluindo campos da tabela com base na lista drop_list
aerial.drop(drop_list, axis=1,inplace = True)
aerial = aerial[ aerial.iloc[:,8]!="4248"] # ignora esta latitude de lançamento 
aerial = aerial[ aerial.iloc[:,9]!=1355]   # ignora esta longitude de lançamento

#reproduzindo informacoes das colunas da tabela aerial apos exclusao 
aerial.info()

# Somente o que irei utilizar

#Inforamando linhas que seram armazenadas na tabela weather_station_location
weather_station_location = weather_station_location.loc[:,["WBAN","NAME","STATE/COUNTRY ID","Latitude","Longitude"] ]

#reproduzindo informacoes das colunas da tabela weather_station_location apos insercao de linhas
weather_station_location.info()

# Somente o que iremos utililizar

#Inforamando linhas que seram armazenadas na tabela weather
weather = weather.loc[:,["STA","Date","MeanTemp"] ]

#reproduzindo informacoes das colunas da tabela weather apos insercao de linhas
weather.info()

"""Visualização de dados
 Vou começar com noções básicas de visualização que compreendem dados
 - Quantos países quais ataques
 - Principais países-alvo
 - As 10 melhores séries de aeronaves
 - Localizações base da decolagem (países de Ataque)
 - Locais de destino 
 - Caminhos de bombardeio
 - Teatro de Operações
 - Localizações das estações meteorológicas
"""

# País

#reproduzindo informacoes da coluna Country da tabela aerial com dados e um grafico
print(aerial['Country'].value_counts())
plt.figure(figsize=(22,10))
sns.countplot(aerial['Country'])
plt.show()

# Principais países-alvo

#reproduzindo informacoes da coluna Target Country da tabela aerial com dados e 2 graficos
print(aerial['Target Country'].value_counts()[:10])
plt.figure(figsize=(22,10))
sns.countplot(aerial['Target Country'])
plt.xticks(rotation=90)
plt.show()

# As 10 melhores séries de aeronaves

#Selecionando 10 das melhores aeronaves cadastradas na tabela e reproduzindo com os dados e um grafico 
data = aerial['Aircraft Series'].value_counts()
print(data[:10])

#definindo um objeto em formato de grafico de barra contendo um dicionario para ser utilizado no grafico abaixo
data = [go.Bar(
            x=data[:10].index,
            y=data[:10].values,
            hoverinfo = 'text',
            marker = dict(color = 'rgba(177, 14, 22, 0.5)',
                             line=dict(color='rgb(0,0,0)',width=1.5)),
    )]

#definindo dicionario para ser usado no grafico abaixo
layout = dict(
    title = 'Aircraft Series',
)

#Reproduzindo grafico com dados das variaveis data e layout
fig = go.Figure(data=data, layout=layout)
iplot(fig)

"""Arenonave mais utilizada é o A36 Agora vamos visualizar as bases dos países que atacam Na plot abaixo, a cor azul chama a atenção, são os EUA e a cor vermelha é a Grã-Bretanha"""

#reproduzindo a tabela aerial
aerial.head()

#Ataques

#definindo cores para colunas da tabela aerial
aerial["color"] = ""
aerial.color[aerial.Country == "USA"] = "rgb(0,116,217)"
aerial.color[aerial.Country == "GREAT BRITAIN"] = "rgb(255,65,54)"
aerial.color[aerial.Country == "NEW ZEALAND"] = "rgb(133,20,75)"
aerial.color[aerial.Country == "SOUTH AFRICA"] = "rgb(255,133,27)"


#Apos a definicao de cores , definindo 2 dicionarios para reproduzi-los em um grafico abaixo
data = [dict(
    type='scattergeo',
    lon = aerial['Takeoff Longitude'],
    lat = aerial['Takeoff Latitude'],
    hoverinfo = 'text',
    text = "Country: " + aerial.Country + " Takeoff Location: "+aerial["Takeoff Location"]+" Takeoff Base: " + aerial['Takeoff Base'],
    mode = 'markers',
    marker=dict(
        sizemode = 'area',
        sizeref = 1,
        size= 10 ,
        line = dict(width=1,color = "white"),
        color = aerial["color"],
        opacity = 0.7),
)]
layout = dict(
    title = 'Countries Take Off Bases ',
    hovermode='closest',
    geo = dict(showframe=False, showland=True, showcoastlines=True, showcountries=True,
               countrywidth=1, projection=dict(type='mercator'),
              landcolor = 'rgb(217, 217, 217)',
              subunitwidth=1,
              showlakes = True,
              lakecolor = 'rgb(255, 255, 255)',
              countrycolor="rgb(5, 5, 5)")
)


#Reproduzindo grafico com dados das variaveis data e layout
fig = go.Figure(data=data, layout=layout)
iplot(fig)

"""Ok, agora vou visualizar os trajetos de bombardeio de que país a partir do qual decolam a bomba base e quais países e cidades."""

# Trajetos do Bombardeio
# trajeto 1

#Definindo dicionario para utilizar no grafico abaixo
airports = [ dict(
        type = 'scattergeo',
        lon = aerial['Takeoff Longitude'],
        lat = aerial['Takeoff Latitude'],
        hoverinfo = 'text',
        text = "Country: " + aerial.Country + " Takeoff Location: "+aerial["Takeoff Location"]+" Takeoff Base: " + aerial['Takeoff Base'],
        mode = 'markers',
        marker = dict( 
            size=5, 
            color = aerial["color"],
            line = dict(
                width=1,
                color = "white"
            )
        ))]

#trajeto 2


#Definindo dicionario para utilizar no grafico abaixo
targets = [ dict(
        type = 'scattergeo',
        lon = aerial['Target Longitude'],
        lat = aerial['Target Latitude'],
        hoverinfo = 'text',
        text = "Target Country: "+aerial["Target Country"]+" Target City: "+aerial["Target City"],
        mode = 'markers',
        marker = dict( 
            size=1, 
            color = "red",
            line = dict(
                width=0.5,
                color = "red"
            )
        ))]

# trajeto 3


#Definindo dicionario com base no tamanho da coluna Target Longitude da tabela aerial para utilizar no grafico abaixo
flight_paths = []
for i in range( len( aerial['Target Longitude'] ) ):
    flight_paths.append(
        dict(
            type = 'scattergeo',
            lon = [ aerial.iloc[i,9], aerial.iloc[i,16] ],
            lat = [ aerial.iloc[i,8], aerial.iloc[i,15] ],
            mode = 'lines',
            line = dict(
                width = 0.7,
                color = 'black',
            ),
            opacity = 0.6,
        )
    )


#Definindo dicionario para utilizar no grafico abaixo
layout = dict(
    title = 'Bombing Paths from Attacker Country to Target ',
    hovermode='closest',
    geo = dict(showframe=False, showland=True, showcoastlines=True, showcountries=True,
               countrywidth=1, projection=dict(type='mercator'),
              landcolor = 'rgb(217, 217, 217)',
              subunitwidth=1,
              showlakes = True,
              lakecolor = 'rgb(255, 255, 255)',
              countrycolor="rgb(5, 5, 5)")
)

#Reproduzindo grafico com variaveis data, airports e layout
fig = dict( data=flight_paths + airports+targets, layout=layout )
iplot( fig )

"""Como você pode ver pelos caminhos dos bombardeios, a maior parte do ataque é realizada no teatro de operações do Mediterrâneo. 
 Teatro de Operações:
 - ETO: Teatro Europeu de Operação
 - PTO: Teatro de Operações do Pacífico
 - MTO: Teatro de Operações Mediterrâneo
 - CBI: China-Burma-India Theater of Operations
 - EAST AFRICA: East Africa Theater of Operations
"""

# Teatro de operações

#Reproduzindo grafico da coluna Theater of Operations da tabela aerial

print(aerial['Theater of Operations'].value_counts())
plt.figure(figsize=(22,10))
sns.countplot(aerial['Theater of Operations'])
plt.show()

"""As localizações das estações meteorológicas estão abaixo"""

# Localizações das estações meteorológicas

#Definindo dicionario para utilizar no grafico abaixo
data = [dict(
    type='scattergeo',
    lon = weather_station_location.Longitude,
    lat = weather_station_location.Latitude,
    hoverinfo = 'text',
    text = "Name: " + weather_station_location.NAME + " Country: " + weather_station_location["STATE/COUNTRY ID"],
    mode = 'markers',
    marker=dict(
        sizemode = 'area',
        sizeref = 1,
        size= 8 ,
        line = dict(width=1,color = "white"),
        color = "blue",
        opacity = 0.7),
)]
#Definindo dicionario para utilizar no grafico abaixo
layout = dict(
    title = 'Weather Station Locations ',
    hovermode='closest',
    geo = dict(showframe=False, showland=True, showcoastlines=True, showcountries=True,
               countrywidth=1, projection=dict(type='mercator'),
              landcolor = 'rgb(217, 217, 217)',
              subunitwidth=1,
              showlakes = True,
              lakecolor = 'rgb(255, 255, 255)',
              countrycolor="rgb(5, 5, 5)")
)

#Reproduzindo grafico com variaveis data e layout
fig = go.Figure(data=data, layout=layout)
iplot(fig)

"""- Vamos concentrar a guerra nos EUA e na BURMA
 - Nesta guerra, os EUA bombardearam BURMA (cidade de KATHA) de 1942 a 1945.
 - A estação meteorológica mais próxima a esta guerra é BINDUKURI e possui registro de temperatura de 1943 a 1945.
 - Agora vamos visualizar essa situação. Porém, antes da visualização, precisamos criar objetos de data e data e hora.
"""

#Utilizando o metodo para automatizar WLAN o .WBAN para pegar o id do objeto weather_station_location.NAME e armazenar dentro da tabela weather_station_id
weather_station_id = weather_station_location[weather_station_location.NAME == "BINDUKURI"].WBAN 
#Utilizando o metodo para automatizar WLAN o .WBAN para pegar o bin do objeto weather.STA e armazenar na tabela weather_bin
weather_bin = weather[weather.STA == 32907]
#Utilizando o metodo para automatizar WLAN o .WBAN para pegar a data do objeto weather.STA e armazenar na coluna Date
weather_bin["Date"] = pd.to_datetime(weather_bin["Date"])

#Reproduzindo grafico dos dados coletados acima da tabela weather_bin
plt.figure(figsize=(22,10))
plt.plot(weather_bin.Date,weather_bin.MeanTemp)
plt.title("Mean Temperature of Bindukuri Area")
plt.xlabel("Date")
plt.ylabel("Mean Temperature")
plt.show()

""" - Como você pode ver, temos medições de temperatura de 1943 a 1945.
 - A temperatura oscila entre 12 e 32 graus.
 - A temperatura dos meses de inverno é mais fria que a temperatura dos meses de verão.
"""

#Importando tabela operations_dataset.csv

aerial = pd.read_csv("../input/operations_dataset.csv")

#Definindo as colunas year e month da tabela aerial para separar os campos com /
aerial["year"] = [ each.split("/")[2] for each in aerial["Mission Date"]]
aerial["month"] = [ each.split("/")[0] for each in aerial["Mission Date"]]

#armazenando colunas na tabela aerial desde que compram as condicoes definidas abaixo

aerial = aerial[aerial["year"]>="1943"]
aerial = aerial[aerial["month"]>="8"]

#Convertendo os dados da coluna Mission Date para o formato datetime
aerial["Mission Date"] = pd.to_datetime(aerial["Mission Date"])

#armazenando dados nas variaveis attack, target e city para utilizar na tabela aerial_war 
attack = "USA"
target = "BURMA"
city = "KATHA"
aerial_war = aerial[aerial.Country == attack]
aerial_war = aerial_war[aerial_war["Target Country"] == target]
aerial_war = aerial_war[aerial_war["Target City"] == city]

#declarando as listas liste e aa
liste = []
aa = []

#armazenando os valores da coluna Mission Date da tabela aerial_war na variavel liste 
for each in aerial_war["Mission Date"]:
    dummy = weather_bin[weather_bin.Date == each]
    liste.append(dummy["MeanTemp"].values)
aerial_war["dene"] = liste

#Para cada valor invalido localizado na tabela aerial_war, ele ira acrescentar 0 na variavel
for each in aerial_war.dene.values:
    aa.append(each[0])

# Create a trace

#definindo um objeto em formato de grafico de pontos contendo um dicionario para ser utilizado no grafico abaixo

trace = go.Scatter(
    x = weather_bin.Date,
    mode = "lines",
    y = weather_bin.MeanTemp,
    marker = dict(color = 'rgba(16, 112, 2, 0.8)'),
    name = "Mean Temperature"
)

#definindo um objeto em formato de grafico de pontos contendo um dicionario para ser utilizado no grafico abaixo
trace1 = go.Scatter(
    x = aerial_war["Mission Date"],
    mode = "markers",
    y = aa,
    marker = dict(color = 'rgba(16, 0, 200, 1)'),
    name = "Bombing temperature"
)

#definindo um dicionario para ser utilizado no grafico abaixo

layout = dict(title = 'Mean Temperature --- Bombing Dates and Mean Temperature at this Date')
data = [trace,trace1]

#definindo um dicionario com as variaveis layout e data para ser utilizado no grafico abaixo

fig = dict(data = data, layout = layout)
iplot(fig)

"""- Linha verde é a temperatura média medida em Bindukuri.
 - Marcadores azuis são datas de bombardeio e temperatura de data de bombardeio.
 - Como pode ser visto no cenário, os EUA bombardeiam a altas temperaturas.
   - A questão é que podemos prever o tempo futuro e, de acordo com essa previsão, podemos saber se o bombardeio será realizado ou não.
   - Para responder a essa pergunta, vamos começar pela previsão de séries temporais.

Previsão de séries temporais com ARIMA
 - Vamos usar o método mais utilizado ARIMA
 - ARIMA : AutoRegressive Integrated Moving Average - Explicarei em seguida
 - O caminho que seguiremos:
   - O que é série temporal?
   - Estacionariedade de uma série temporal
   - Tornar uma série temporal estacionária?
   - Previsão de uma série temporal

O que são séries temporais?
 - A série temporal é uma coleção de pontos de dados coletados em intervalos de tempo constantes.
 - Depende do tempo.
 - A maioria das séries temporais tem algum tipo de tendência de sazonalidade. Por exemplo, se vendermos sorvete, provavelmente haverá vendas mais altas no verão. Portanto, esta série temporal apresenta tendências de sazonalidade.
 - Outro exemplo, vamos pensar que cortamos uma vez todos os dias durante 1 ano. Como você acha, não haverá um cenário como o número seis que aparece principalmente na temporada de verão ou o número cinco aparece principalmente em janeiro. Portanto, essa série cronológica não apresenta tendências de sazonalidade.

Estacionariedade de uma série temporal
 - Existem três critérios básicos para uma série temporal compreender se é uma série estacionária ou não.
   - As propriedades estatísticas das séries temporais, como média e variância, devem permanecer constantes ao longo do tempo para chamar séries temporais como estacionárias.
     - média constante
     - variação constante
     - autocovariância que não depende do tempo. autocovariância é covariância entre séries temporais e séries temporais defasadas.
 - Permite visualizar e verificar a tendência de sazonalidade de nossas séries temporais.
"""

# Temperatura média da área de Bindikuri

#Reproduzindo um grafico com as variaveis Date e MeanTemp do objeto weather_bin

plt.figure(figsize=(22,10))
plt.plot(weather_bin.Date,weather_bin.MeanTemp)
plt.title("Mean Temperature of Bindukuri Area")
plt.xlabel("Date")
plt.ylabel("Mean Temperature")
plt.show()

# permite criar séries temporais a partir do tempo

#Armazenando na tabela timeSeries as linhas da tabela weather_bin a Date e MeanTemp
timeSeries = weather_bin.loc[:, ["Date","MeanTemp"]]
timeSeries.index = timeSeries.Date

#Excluindo Coluna Date antes de armazenar a tabela timeSeries na variavel ts
ts = timeSeries.drop("Date",axis=1)

"""- Como você pode ver no gráfico acima, nossas séries temporais apresentam variações sazonais. No verão, a temperatura média é mais alta e no inverno a temperatura média é mais baixa a cada ano.
 - Agora vamos verificar estacionário de séries temporais. Podemos verificar a estacionariedade usando os seguintes métodos:
   - Plotting Rolling Statistics:: Temos uma janela, digamos que o tamanho da janela é 6 e, em seguida, encontramos a média e a variação do rolamento para verificar estacionário.
   - Teste Dickey-Fuller: Os resultados do teste incluem uma estatística de teste e alguns valores críticos para os níveis de confiança das diferenças. Se a estatística do teste for menor que o valor crítico, podemos dizer que as séries temporais são estacionárias.
"""

# biblioteca adfuller

#Importando a biblioteca statsmodels.tsa.stattools
from statsmodels.tsa.stattools import adfuller

# check_adfuller

#Declarando a funcao check_adfuller com parametro a variavel ts 
def check_adfuller(ts):
    # Dickey-Fuller test

    #armazenando na variavel result a variavel ts apos verificar a integridade dos dados armazenados em ts em formato Time series
    result = adfuller(ts, autolag='AIC')
    print('Test statistic: ' , result[0])
    print('p-value: '  ,result[1])
    print('Critical Values:' ,result[4])

# check_mean_std

#Declarando a funcao check_mean_std com parametro a variavel ts 
def check_mean_std(ts):
    #Rolling statistics

    #armazenando a media de 12 registros armazenados da variavel ts na variavel rolmean
    rolmean = ts.rolling(12).mean()

     #armazenando de 12 registros armazenados da variavel ts com desvio padrao na variavel rolstd
    rolstd = ts.rolling(12).std()

    #reproduzindo e armazenando 3 graficos nas variaveis orig, mean, std 
    plt.figure(figsize=(22,10))   
    orig = plt.plot(ts, color='red',label='Original')
    mean = plt.plot(rolmean, color='black', label='Rolling Mean')
    std = plt.plot(rolstd, color='green', label = 'Rolling Std')
    plt.xlabel("Date")
    plt.ylabel("Mean Temperature")
    plt.title('Rolling Mean & Standard Deviation')
    plt.legend()
    plt.show()

# verificação estacionário: média, variância (std) e teste de adfuller

#chamando as funcoes acima 
check_mean_std(ts)
check_adfuller(ts.MeanTemp)

"""- Nosso primeiro critério para estacionário é a média constante. Portanto, falhamos porque a média não é constante, como você pode ver no gráfico (linha preta) acima. (não estacionário)
 - O segundo é a variação constante. Parece constante. (sim estacionário)
   O terceiro é que, se a estatística do teste for menor que o valor crítico, podemos      dizer que a série temporal é estacionária. Vamos olhar:
     - test statistic = -1.4 and critical values = {'1%': -3.439229783394421, '5%':            -2.86545894814762, '10%': -2.5688568756191392}. Test statistic is bigger than          the critical values. (no stationary)
 - Como resultado, temos certeza de que nossa série temporal não é estacionária.
 - Vamos deixar séries temporais estacionárias na próxima parte.

Tornar uma série temporal estacionária?

 - Como mencionamos anteriormente, há duas razões por trás da não estacionariedade das séries temporais
   - Tendência: média variável ao longo do tempo. Precisamos de média constante para séries estacionárias.
   - Sazonalidade: variações em horário específico. Precisamos de variações constantes para séries estacionárias.
 - Primeiro resolva o problema de tendência (média constante)
   - O método mais popular é a média móvel.
     - Média móvel: temos janelas que levam a média ao longo da amostra 'n' passada. 'n' é o tamanho da janela.
"""

# metodo da média móvel

#Declarando a variavel window_size 
window_size = 6

#armazenando a media de 12 registros armazenados da variavel ts na variavel moving_avg
moving_avg = ts.rolling(12).mean()

#Reproduzindo grafico dos dados acima
plt.figure(figsize=(22,10))
plt.plot(ts, color = "red",label = "Original")
plt.plot(moving_avg, color='black', label = "moving_avg_mean")
plt.title("Mean Temperature of Bindukuri Area")
plt.xlabel("Date")
plt.ylabel("Mean Temperature")
plt.legend()
plt.show()

#armazenando o resultado da subtracao de ts - moving_avg dentro da variavel ts_moving_avg_diff
ts_moving_avg_diff = ts - moving_avg

#Removendo todoas as colunas da tabela ts_moving_avg_diff que estao como NaN
ts_moving_avg_diff.dropna(inplace=True) # 6 primeiros é o valor nan devido ao tamanho da janela

# verificação do  estacionário: média, variância (std) e teste mais adequado

#chamando as funcoes acima so que como parametro as variaveis ts_moving_avg_diff e ts_moving_avg_diff.MeanTemp
check_mean_std(ts_moving_avg_diff)
check_adfuller(ts_moving_avg_diff.MeanTemp)

"""- Critérios médios constantes: a média parece constante, como você pode ver no gráfico (linha preta) acima. (sim estacionário)
 - O segundo é a variação constante. Parece constante. (sim estacionário)
 - A estatística do teste é menor que os valores críticos de 1%, portanto, podemos dizer com 99% de confiança que se trata de uma série estacionária. (sim estacionário)
 - Atingimos séries temporais estacionárias. No entanto, vamos analisar mais um método para evitar tendência e sazonalidade.
   - Método de diferenciação: é um dos métodos mais comuns. A idéia é que tenham diferença entre séries temporais e séries temporais alteradas.
"""

# método de diferenciação

#Armazenando na variavel ts-diff e subtracao entre ts e ele mesmo so que apenas com variaveis com periodos validos 
ts_diff = ts - ts.shift()

#Reproduzindo grafico com dados acima 

plt.figure(figsize=(22,10))
plt.plot(ts_diff)
plt.title("Differencing method") 
plt.xlabel("Date")
plt.ylabel("Differencing Mean Temperature")
plt.show()

#Removendo todoas as colunas da tabela ts_diff que estao como NaN
ts_diff.dropna(inplace=True) # devido à mudança, existem valores nan
# verifique estacionário: média, variância (std) e teste de adfuller

#chamando as funcoes acima so que como parametro as variaveis ts_diff e ts_diff.MeanTemp
check_mean_std(ts_diff)
check_adfuller(ts_diff.MeanTemp)

"""- Critérios médios constantes: a média parece constante, como você pode ver no gráfico (linha preta) acima. (é estacionário)
 - O segundo é a variação constante. Parece constante. (é estacionário)
 - A estatística do teste é menor que os valores críticos de 1%, portanto, podemos dizer com 99% de confiança que se trata de uma série estacionária. (é estacionário)

Previsão de uma série temporal
 - Aprendemos dois métodos diferentes, que são métodos móveis de média e diferenciação, para evitar problemas de tendência e sazonalidade
 - Para previsão (previsão), usaremos as séries temporais ts_diff resultantes do método de diferenciação. Não há razão para eu apenas escolher.
 - O método de previsão também é o ARIMA, que é a média móvel integrada auto-regressiva.
   - AR: Auto-regressivo (p): os termos de AR são apenas defasagens na variável dependente. Por exemplo, digamos que p seja 3, usaremos x (t-1), x (t-2) e x (t-3) para prever x (t)
   - I: Integrado (d): Esse é o número de diferenças não sazonais. Por exemplo, no nosso caso, consideramos a diferença de primeira ordem. Então passamos essa variável e colocamos d = 0
   - MA: Médias Móveis (q): os termos MA são erros de previsão atrasados ​​na equação de previsão.
 - (p, d, q) são parâmetros do modelo ARIMA.
 - Para escolher os parâmetros p, d, q, usaremos dois gráficos diferentes.
   - Função de autocorrelação (ACF): Medição da correlação entre séries temporais e versão atrasada das séries temporais.
   - Função de autocorrelação parcial (PACF): mede a correlação entre as séries temporais e a versão defasada das séries temporais, mas após eliminar as variações já explicadas pelas comparações intermediárias.
"""

# ACF e PACF 

#importando biblioteca statsmodels.tsa.stattools

from statsmodels.tsa.stattools import acf, pacf

#declarando variaveis para receber 2 tipos de autocorrelacao da tabela ts_diff
lag_acf = acf(ts_diff, nlags=20)
lag_pacf = pacf(ts_diff, nlags=20, method='ols')

# ACF

#Reproduzindo Grafico da tabela lag_acf
plt.figure(figsize=(22,10))

plt.subplot(121) 
plt.plot(lag_acf)
plt.axhline(y=0,linestyle='--',color='gray')
plt.axhline(y=-1.96/np.sqrt(len(ts_diff)),linestyle='--',color='gray')
plt.axhline(y=1.96/np.sqrt(len(ts_diff)),linestyle='--',color='gray')
plt.title('Autocorrelation Function')

# PACF

#Reproduzindo Grafico da tabela lag_pacf
plt.subplot(122)
plt.plot(lag_pacf)
plt.axhline(y=0,linestyle='--',color='gray')
plt.axhline(y=-1.96/np.sqrt(len(ts_diff)),linestyle='--',color='gray')
plt.axhline(y=1.96/np.sqrt(len(ts_diff)),linestyle='--',color='gray')
plt.title('Partial Autocorrelation Function')
plt.tight_layout()

""" - Duas linhas pontilhadas são os intervalos de confiança. Usamos essas linhas para determinar os valores de 'p' e 'q'
   - Escolhendo p: o valor do atraso no qual o gráfico PACF cruza o intervalo de confiança superior pela primeira vez. p = 1.
   - Escolhendo q: o valor do atraso no qual o gráfico ACF cruza o intervalo de confiança superior pela primeira vez. q = 1.
 - Agora vamos usar (1,0,1) como parâmetros dos modelos ARIMA e prever
   - ARIMA: da biblioteca de estatísticas
   - datetime: vamos usá-lo índices de início e de fim do método de previsão
"""

# Biblioteca ARIMA

#Importando bibliotecas statsmodels.tsa.arima_model e pandas
from statsmodels.tsa.arima_model import ARIMA
from pandas import datetime

# fit model

#declarando variaveis para receber a autocorrelacao da tabela ts
model = ARIMA(ts, order=(1,0,1)) # (ARMA) = (1,0,1)

#Realizando treino da tabela model e armazenando na tabela model_fit
model_fit = model.fit(disp=0)

# Preditivo (previsão)

#Armazendando 2 datas nas variaveis start_index e end_index 
start_index = datetime(1944, 6, 25)
end_index = datetime(1945, 5, 31)

#Realizando a previsao da tabela model_fit e armazenando dentro da variavel forecast
forecast = model_fit.predict(start=start_index, end=end_index)

# visualização

#Reproduzindo o grafico dos dados acima 
plt.figure(figsize=(22,10))
plt.plot(weather_bin.Date,weather_bin.MeanTemp,label = "original")
plt.plot(forecast,label = "predicted")
plt.title("Time Series Forecast")
plt.xlabel("Date")
plt.ylabel("Mean Temperature")
plt.legend()
plt.show()

""" - Vamos prever e visualizar todo o caminho e encontrar o erro médio quadrático"""

# prever todo o caminho

#Importando biblioteca sklearn.metrics
from sklearn.metrics import mean_squared_error
# fit model

#declarando variaveis para receber a autocorrelacao da tabela ts
model2 = ARIMA(ts, order=(1,0,1)) # (ARMA) = (1,0,1)
model_fit2 = model2.fit(disp=0)

#Realizando previsao da tabela model_fit2 e armazenando em forecast2
forecast2 = model_fit2.predict()

#Armazenando qualquer erro no calculo de media quadrada das variaveis ts e forecast2 dentro da variavel error
error = mean_squared_error(ts, forecast2)
print("error: " ,error)
# visualização

#Reproduzindo o grafico dos dados acima 

plt.figure(figsize=(22,10))
plt.plot(weather_bin.Date,weather_bin.MeanTemp,label = "original")
plt.plot(forecast2,label = "predicted")
plt.title("Time Series Forecast")
plt.xlabel("Date")
plt.ylabel("Mean Temperature")
plt.legend()
plt.savefig('graph.png')

plt.show()

"""Referências

[Time Series Prediction](http://https://www.kaggle.com/)

[ARIMA](http://https://pt.wikipedia.org/wiki/ARIMA)
"""