public class ObterPartesString {
    
    public static void main(String[] args) {
        
        String data = "05/10/2019";
        String s[];
        int dia, mes,ano;
        s=data.split("/");
        System.out.println("S[0]: " + s[0] + " s[1]: " + s[1] + " s[2]: " + s[2]);
        dia = Integer.parseInt(s[0]);
        mes = Integer.parseInt(s[1]);
        ano = Integer.parseInt(s[2]);
        System.out.println("Dia: " + dia + " Mes: " + mes + " Ano: " + ano);
    }