import java.util.*;
public class Listas {
    
    public static void adicionaElementos(){
        // esse metodo mostra como adicionar um elemento no ArrayList
        ArrayList <String> nomes = new ArrayList();
        nomes.add("Ana");
        nomes.add("Claudia");
        nomes.add("Vanessa");
        nomes.add("Glenda");
        nomes.add("Juliana");
        System.out.println("Lista de nomes: " + nomes);
    }
    
    public static void verificaVazio(){
        //esse metodo mostra se um ArrayList esta vazio
        ArrayList<String> letras = new ArrayList();
        System.out.println("O ArrayList letras esta vazio: " + letras.isEmpty());
        letras.add("A");
        letras.add("B");
        letras.add("C");
        letras.add("D");
        letras.add("E");
        System.out.println("Apos a inclusao das letras");
        System.out.println("O ArrayList letras esta vazio: " + letras.isEmpty());
        System.out.println("Lista de letras: " + letras);
        
        
    }
     public static void acessarElementos(){
         //esse metodo mostra como acessar um elemento do ArrayList
         ArrayList<String> vogais = new ArrayList();
         vogais.add("A");
         vogais.add("E");
         vogais.add("I");
         vogais.add("O");
         vogais.add("U");
         // o metodo size() retorna o tamanho do ArrayList
         System.out.println("Conteudo do ArrayList vogais: " + vogais);
         System.out.println("Tamanho do ArrayList vogais: " + vogais.size());
         for (int i = 0; i < vogais.size(); i++) {
             System.out.println("Vogal: " + vogais.get(i));
             
         }
         
         for(String v : vogais){
             System.out.println("Vogal por outro for: " + v);
         }
     }
    
    public static void main(String[] args) {
        adicionaElementos();
        verificaVazio();
        acessarElementos();
    }
    
}