#include <stdio.h>
#include <stdlib.h>


//COM NUMEROS
int main(){

  FILE *fp;

  fp = fopen("arquivo.txt", "w");

  if(fp == NULL){
    printf("Arquivo nao pode ser aberto para escrita");
    exit(1);
  }

  int a = 25;

  fprintf(fp, "Valor da variavel %d", a);

  fclose(fp);

//COM CARACTERES

  FILE *f1, *f2;

  f1 = fopen("arquivo.txt", "w");

  if(f1 == NULL){
    printf("arquivo nao pode ser aberto para escrita");
    exit(1);
  }
  f2 = fopen("esboco.txt", "r");

  if(f2 == NULL){
    printf("arquivo nao pode ser aberto para leitura");
    exit(1);
  }

  int ch;

  while((ch = fgetc(f1)) == EOF){
    fputc(ch, f2);
  }

  fclose(f1), fclose(f2);


  
