#include <stdio.h>
#include <stdlib.h>


int fatorial(int x){
  if (x == 0){
    return 1;
  }else{
    return x * (fatorial (x-1));
  }
}


int main(){
  fatorial(5);
}
