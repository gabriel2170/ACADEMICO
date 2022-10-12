#include <stdio.h>
#include <stdlib.h>

int fibonacci(int x){
  if(x==1){
    return 0;
  }else if(x==2){
    return 1;
  }else{
    return (fibonacci(x-1)+fibonacci(x-2));
  }

}


int main(){
  fibonacci(25);
}
