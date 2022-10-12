#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(){
  FILE *fs;

  fs = fopen("arquivo.txt", "r");
  if(fs == NULL){
    printf("arquivo nao pode ser aberto");
    exit(1);
  }
  int s[25];

  if(fgets(s, 5, fs)== NULL){
      printf("erro");
  }else{
    printf("tamanho do texto", strlen(s));
  }

  fclose(fs);
}
