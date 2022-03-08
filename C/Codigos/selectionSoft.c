#include <stdio.h>
#include <stdlib.h>
#define tam 10

void selectionSort(int vet[]){
  int posicaoDoMenorValor, aux, i, j;

  for(i=0; i<tam; i++){
    posicaoDoMenorValor = i;

    for(j=i+1; j<tam; j++){
      if(vet[j] < vet[posicaoDoMenorValor]){
        posicaoDoMenorValor = j;
      }
    }

    if(posicaoDoMenorValor != i){
      aux = vet[i];
      vet[i] = vet[posicaoDoMenorValor];
      vet[posicaoDoMenorValor] = aux;
    }
  }
}



void mostrarLista(vet[]){
  for(int i=0; i < tam; i++){
    printf("%d ", vet[i]);
  }
}


int main(void) {

  int vet[tam] = {5,2,4,7,5,8,6,5,2,5};
  selectionSort(vet);
  mostrarLista(vet);
}
