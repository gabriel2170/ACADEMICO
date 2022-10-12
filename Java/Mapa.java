import java.util.*;
public class MapaColecao {
    public static void main(String[] args) {
        // duas maneiras de criar um objeto do tipo mapa
        HashMap<Integer,String> usuarios = new HashMap();
        // utilizar a interface
        Map<Integer,String> usuarios1 = new HashMap();
        // inclusao de daos no mapa
        usuarios1.put(10, "Fernando");
        usuarios1.put(20, "Claudia");
        usuarios1.put(30,"Ana");
        usuarios1.put(50,"Paulo");
        System.out.println("Mapa usuarios1: " + usuarios1);
        System.out.println("Quantidade de pares no mapa usuarios1: " + usuarios1.size());
        System.out.println("Quantidade de pares no mapa usuarios: " + usuarios.size());
        usuarios1.put(10,"Orsi");
        System.out.println("Mapa usuarios1 apos a alteracao: " + usuarios1);
        usuarios1.putIfAbsent(10, "Fernando");
        System.out.println("Mapa usuarios1 apos a possivel alteracao: " + usuarios1);
        // verifica se o mapa estÃ¡ vazio
        System.out.println("Usuarios1 esta vazio: " + usuarios1.isEmpty());
        System.out.println("Usuarios esta vazio: " + usuarios.isEmpty());
        // obter o valor associado a uma chave
        System.out.println("Valor associado a chave 50: " + usuarios1.get(50));
        System.out.println("Valor associado a chave 100: " + usuarios1.get(100));
        //existe um metodo que pode acessar as chave de um mapa
        System.out.println("Metodo que permite acesso as chaves de um papa: " + usuarios1.keySet());
        //existe um metodo que dÃ¡ acesso aos valores do mapa
        System.out.println("Metodo que permite o acesso aos valores do mapa: " + usuarios1.values());
        //existe um metodo que dÃ¡ acesso aos pares do mapa
        System.out.println("Metod que permite o acesso aos pares do mapa: " + usuarios1.entrySet());
        //metodo para verificar se uma chave existe no mapa
        System.out.println("A chave 20 existe no mapa: " + usuarios1.containsKey(20));
        System.out.println("A chave 25 existe no mapa: " + usuarios1.containsKey(25));
        //metodo para verificar se um valor exixte no mapa
        System.out.println("O valor Orsi exixte no mapa: " + usuarios1.containsValue("Orsi"));
        System.out.println("O valor Fernando existe no mapa: " + usuarios1.containsValue("Fernando"));
        Iterator <Integer> iteraChave = usuarios1.keySet().iterator();
        while(iteraChave.hasNext()){
            System.out.println("Chave obtida: " + iteraChave.next());
        }
        System.out.println("");
        Iterator <String> iteraValor = usuarios1.values().iterator();
        while(iteraValor.hasNext()){
            System.out.println("Valor Obtido: " + iteraValor.next());
        }
        
        for(int chave:usuarios1.keySet()){
            System.out.println("Chave obtida pelo for: " + chave);
        }
        
        for(String valor:usuarios1.values()){
            System.out.println("Valor obtido pelo for: " + valor);
        }
    }
    
}