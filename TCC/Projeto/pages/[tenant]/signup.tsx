import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button1 } from '../../components/Button1';
import { Header } from '../../components/Header';
import { InputField } from '../../components/InputField';
import { useAppContext } from '../../contexts/app';
import { useApi } from '../../lib/useApi';
import styles from '../../styles/SignUp.module.css';
import { Tenant } from '../../types/Tenant';
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { rtdb } from '../../firebase/rtdb';
import { auth } from '../../firebase/auth';
import { push, ref, set } from '@firebase/database';


const SignUp = (data: Props) => {
  const { tenant, setTenant } = useAppContext(); // Inicializando o context

  useEffect(() => {
    setTenant(data.tenant);
  }, []); // Setando o tenant no context para pegar as informações


  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');




  const handleSubmit = () => {

    //criar cadastro de usuario com email e senha 

    if (nome == ''){
      alert('Campo nome esta vazio!!')
    }else if(email != ''){
      alert('Campo email esta vazio!!')
    }else if(password != ''){
      alert('Campo senha esta vazio!!')
    }else if(password.length < 6){
      alert('Insira uma senha com mais de 6 Digitos!!')
    }else{
      createUserWithEmailAndPassword(auth, email, password)
      .then((credencial) => {

        alert(`Parabens ${nome}, voce foi cadastrado no sistema!! `)

        const lista = ref(rtdb, 'Usuarios')
        const addDados = push(lista)
        set(addDados, {
          nome,
          email,
          password
        })
      })
      .catch((error) => {
        alert(`Email ja esta cadastrado!!`)
      })
    }   
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Safe Home Delivery | Cadastro </title>
      </Head>

      <Header
        color={data.tenant.primaryColor}
        backHref={'/' + data.tenant.slug + '/login'}
      />

      <div className={styles.title}>Safe Home Delivery</div>

      <div className={styles.tenant} style={{ color: data.tenant.primaryColor }}>| {data.tenant.name} |</div>

      <div className={styles.subtitle}>Informe seus dados</div>

      <div className={styles.formArea}>

        <div className={styles.inputArea}>
          <InputField
            color={data.tenant.primaryColor}
            placeholder="Nome"
            value={nome}
            onChange={setNome}
          />
        </div>

        <div className={styles.inputArea}>
          <InputField
            color={data.tenant.primaryColor}
            placeholder="Email"
            value={email}
            onChange={setEmail}
          />
        </div>

        <div className={styles.inputArea}>
          <InputField
            color={data.tenant.primaryColor}
            placeholder="Senha"
            value={password}
            onChange={setPassword}
            password
          />
        </div>

        <div className={styles.inputArea} >
          <Button1
            color={data.tenant.primaryColor}
            label="Cadastrar"
            onClick={handleSubmit}
            fill />
        </div>

        <div className={styles.signup}>
          <Link href={'/' + data.tenant.slug + '/login'}><a>Já tem cadastro? Fazer Login</a></Link>
        </div>

      </div>
    </div>
  );
}

export default SignUp;

// Função usada para pegar os tenants/estabelecimentos existentes no app, redirecionando para as urls dos mesmos.
type Props = {
  tenant: Tenant
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { tenant: tenantSlug } = context.query;
  console.log('Tenant: ', tenantSlug)
  const api = useApi(tenantSlug as string);

  const tenant = await api.getTenant();

  if (!tenant) {
    return { redirect: { destination: '/', permanent: false } }
  } // Bloqueando o acesso a tenants/estabelecimentos que não existem e voltando pra pagina inicial.

  return {
    props: {
      tenant
    }
  }

}