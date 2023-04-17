import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import { Button1 } from '../../components/Button1';
import { Header } from '../../components/Header';
import { InputField } from '../../components/InputField';
import { useAppContext } from '../../contexts/app';
import { useApi } from '../../lib/useApi';
import styles from '../../styles/Login.module.css';
import { Tenant } from '../../types/Tenant';
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { auth } from '../../firebase/auth';


const Login = (data: Props) => {
  const { tenant, setTenant } = useAppContext(); // Inicializando o context

  useEffect(() => {
    setTenant(data.tenant);
  }, []); // Setando o tenant no context para pegar as informações


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {

    //login de usuario com email e senha cadastrados
    
    auth.signOut()

    signInWithEmailAndPassword(auth, email, password)

      .then((credencial) => {
        const user = credencial.user

        alert('Login Efetuado!!')
        Router.push('/' + data.tenant.slug)
      })

      .catch((error) => {
        alert('Erro ao efetuar login!!')
      })

  }

  const handleSignUp = () => {
    Router.push('/' + data.tenant.slug + '/signup')
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Safe Home Delivery | Login </title>
      </Head>

      <Header
        backHref={'/'}
        color={data.tenant.primaryColor}
      />

      <div className={styles.title}>Safe Home Delivery</div>

      <div className={styles.tenant} style={{ color: data.tenant.primaryColor }}>| {data.tenant.name} |</div>

      <div className={styles.subtitle}>Informe seus dados</div>

      <div className={styles.formArea}>
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

        <div className={styles.inputArea}>
          <Button1
            color={data.tenant.primaryColor}
            label="Entrar"
            onClick={handleSubmit}
            fill
          />
        </div>

        <div className={styles.forget}>
          <Link href={'/' + data.tenant.slug + '/forget'}><a>Esqueci minha senha</a></Link>
        </div>

        <div className={styles.forget} style={{ marginTop: "40px" }}>
          <Link href={'/' + data.tenant.slug + '/partner'}><a>{"Sou parceiro"}</a></Link>
        </div>
      </div>

      <div className={styles.signUp}>
        <Button1
          color={data.tenant.primaryColor}
          label="Quero me cadastrar"
          onClick={handleSignUp}
        />
      </div>

    </div>
  );
}

export default Login;



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