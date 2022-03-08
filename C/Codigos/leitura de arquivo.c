#include <stdio.h>
#include <stdlib.h>



int main(){
  FILE *fp;
  fp = fopen("arquivo.txt", "r");

  if(fp == NULL){
    printf("Arquivo nao pode ser aberto para leitura");
    exit(1);
  }

  int a;
  while(fscanf(fp, "%d", &a) != EOF){
    printf("%d", a);
  }
  fclose(fp);
}
