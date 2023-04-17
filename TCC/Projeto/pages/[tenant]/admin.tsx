import { GetServerSideProps } from 'next';
import { FormEvent, useEffect, useState } from 'react';
import { SidemenuAdmin } from '../../components/sidemenuAdmin';
import { useAppContext } from '../../contexts/app';
import { useApi } from '../../lib/useApi';
import styles from '../../styles/HomeAdmin.module.css';
import styles2 from '../../styles/CardapioAdmin.module.css';
import { Tenant } from '../../types/Tenant';
import { auth } from '../../firebase/auth';
import { onValue, ref, set } from '@firebase/database';
import { rtdb } from '../../firebase/rtdb';
import { FirebaseError } from 'firebase/app';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/db';
import { useFormatter } from '../../lib/useFormatter';
import Head from 'next/head';
import { CLIENT_STATIC_FILES_RUNTIME_MAIN } from 'next/dist/shared/lib/constants';

type Refeicao = {
  imagem: string;
  chave: string,
  name: string,
  preco: number,
  opc: string
}

const Home = (data: Props) => {
  const { tenant, setTenant } = useAppContext(); // Inicializando o context
  const [SidemenuOpen, setSidemenuOpen] = useState(false);
  const [refeicao, setRefeicao] = useState<Refeicao[]>()
  const user = auth.currentUser
  const [usuario, setUsuario] = useState()
  const formatter = useFormatter();
  const [search, setSearch] = useState<Refeicao[]>()
  const [buscando, setBuscando] = useState(false)

  useEffect(() => {

    setTenant(data.tenant);

    if (data.tenant.slug == 'delivery1') {
      const lista = ref(rtdb, 'Pizzaria do Tiao')

      onValue(lista, (result: any) => {

        const Refeicoes = Object.entries<Refeicao>(result.val() ?? {}).map(([chave, valor]) => {
          return {
            'chave': chave,
            'imagem': valor.imagem,
            'name': valor.name,
            'preco': valor.preco,
            'opc': valor.opc
          }
        })

        setRefeicao(Refeicoes)
        if (FirebaseError) throw FirebaseError;
      }, { onlyOnce: true })

    }
    if (data.tenant.slug == 'delivery2') {
      const lista = ref(rtdb, 'Cervejaria da Marlene')

      onValue(lista, (result) => {

        const Refeicoes = Object.entries<Refeicao>(result.val() ?? {}).map(([chave, valor]) => {
          return {
            'chave': chave,
            'imagem': valor.imagem,
            'name': valor.name,
            'preco': valor.preco,
            'opc': valor.opc
          }
        })

        setRefeicao(Refeicoes)
        if (FirebaseError) throw FirebaseError;
      }, { onlyOnce: true })

    }
    if (data.tenant.slug == 'delivery3') {
      const lista = ref(rtdb, 'Ze do Burguer')

      onValue(lista, (result) => {

        const Refeicoes = Object.entries<Refeicao>(result.val() ?? {}).map(([chave, valor]) => {
          return {
            'chave': chave,
            'imagem': valor.imagem,
            'name': valor.name,
            'preco': valor.preco,
            'opc': valor.opc
          }
        })

        setRefeicao(Refeicoes)
        if (FirebaseError) throw FirebaseError;
      }, { onlyOnce: true })

    }

    if (data.tenant.slug == 'delivery4') {
      const lista = ref(rtdb, 'Sorveteria do Lionel')

      onValue(lista, (result) => {

        const Refeicoes = Object.entries<Refeicao>(result.val() ?? {}).map(([chave, valor]) => {
          return {
            'chave': chave,
            'imagem': valor.imagem,
            'name': valor.name,
            'preco': valor.preco,
            'opc': valor.opc
          }
        })

        setRefeicao(Refeicoes)
        if (FirebaseError) throw FirebaseError;
      }, { onlyOnce: true })

    }
  }, []);

  async function dadosLogin() {
    const data = await getDocs(collection(db, 'Usuarios'))
    data.forEach(doc => {
      if (doc.data().email == user?.email) {
        setUsuario(doc.data().nome)
      }
    })
  }

  dadosLogin();

  function busca(event: FormEvent) {

    const palavra = event.target.value

    if (palavra.length > 0) {
      setBuscando(true)
      const dados = new Array

      refeicao?.map(itens => {
        const regra = new RegExp(event.target.value, "gi")
        if (regra.test(itens.name)) {
          dados.push(itens)
        }
      })

      setSearch(dados)
    } else {
      setBuscando(false)
    }


  }
  async function tempItens(chave: string, nome: string, preco: number, opc: string, imagem: string) {
    set(ref(rtdb, 'itensToUpdate/'), {
      id: chave,
      nome: nome,
      preco: preco,
      opc: opc,
      imagem: imagem
    });
  }

  return (
    <div className={styles.container}>

      <Head>
        <title> Administrador | {data.tenant.name}</title>
      </Head>

      <header className={styles.header}>

        <div className={styles.headerTop}>

          <div className={styles.headerTopLeft}>
            <div className={styles.headerTittle}>Pagina do Administrador | {data.tenant.name}</div>
            <div className={styles.headerSubTittle}>O que deseja alterar?</div>

            <div className={styles.search} style={{ border: "1px solid" + tenant?.primaryColor }}>
              <input type="text" placeholder='Buscar' onChange={busca} className={styles.searchItem} style={{}} />
            </div>

          </div>

          <div className={styles.headerTopRight}>
            <div className={styles.menuButton}
              onClick={() => setSidemenuOpen(true)}>
              <div className={styles.menuButtonLine} style={{ backgroundColor: tenant?.primaryColor }}></div>
              <div className={styles.menuButtonLine} style={{ backgroundColor: tenant?.primaryColor }}></div>
              <div className={styles.menuButtonLine} style={{ backgroundColor: tenant?.primaryColor }}></div>
            </div>

            <SidemenuAdmin
              tenant={data.tenant}
              open={SidemenuOpen}
              onClose={() => setSidemenuOpen(false)}
            />

          </div>
        </div>
      </header>

      <div className={styles2.buttonAdd}>
        <a href={'/' + data.tenant.slug + '/add'} className={styles2.btn} style={{ textDecoration: "none", color: "#000" }}>Adicionar item</a>
      </div>

      <div className={styles2.grid}>
        {buscando ?

          search?.map(itens => {

            return (
              <div key={itens.chave} className={styles2.container}>

                <div className={styles2.head} style={{ backgroundColor: tenant?.primaryColor }}></div>
                
                <div className={styles2.info}>

                  <div className={styles2.img}>
                    <img src={itens.imagem} />
                  </div>

                  <div className={styles2.infoTitle} id='nome'>{itens.name}</div>

                  <div className={styles2.infoItem}>{itens.opc}</div>

                  <div className={styles2.infoPrice} style={{ color: tenant?.primaryColor }}>{formatter.formatPrice(itens.preco)}</div>

                  <div className={styles2.buttonArea}>

                    <div className={styles2.buttonChange}>
                      <a href={'/' + data.tenant.slug + '/change/' + itens.chave} style={{ textDecoration: "none", color: "#000" }} onClick={() => tempItens(itens.chave, itens.name, itens.preco, itens.opc, itens.imagem)}>Alterar</a>
                    </div>

                    <div className={styles2.buttonDelete}>
                      <a href={'/' + data.tenant.slug + '/delete/' + itens.chave} style={{ textDecoration: "none", color: "#000" }} onClick={() => tempItens(itens.chave, itens.name, itens.preco, itens.opc, itens.imagem)}>Excluir</a>
                    </div>

                  </div>

                </div>
              </div>

            )
          })
          :
          refeicao?.map(itens => {

            return (
              <div key={itens.chave} className={styles2.container}>

                <div className={styles2.head} style={{ backgroundColor: tenant?.primaryColor }}></div>
                
                <div className={styles2.info}>

                  <div className={styles2.img}>
                    <img src={itens.imagem} />
                  </div>

                  <div className={styles2.infoTitle} id='nome'>{itens.name}</div>

                  <div className={styles2.infoItem}>{itens.opc}</div>

                  <div className={styles2.infoPrice} style={{ color: tenant?.primaryColor }}>{'R$' + itens.preco.toFixed(2)}</div>

                  <div className={styles2.buttonArea}>

                    <div className={styles2.buttonChange}>
                      <a href={'/' + data.tenant.slug + '/change/' + itens.chave} style={{ textDecoration: "none", color: "#000" }} onClick={() => tempItens(itens.chave, itens.name, itens.preco, itens.opc, itens.imagem)}>Alterar</a>
                    </div>

                    <div className={styles2.buttonDelete}>
                      <a href={'/' + data.tenant.slug + '/delete/' + itens.chave} style={{ textDecoration: "none", color: "#000" }} onClick={() => tempItens(itens.chave, itens.name, itens.preco, itens.opc, itens.imagem)}>Excluir</a>
                    </div>

                  </div>

                </div>
              </div>

            )
          })
        }

      </div>
    </div >


  );
}

export default Home;



// Função usada para pegar os tenants/estabelecimentos existentes no app, redirecionando para as urls dos mesmos.
type Props = {
  tenant: Tenant

}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { tenant: tenantSlug } = context.query;
  console.log('Tenant: ', tenantSlug)
  const api = useApi(tenantSlug as string);

  const tenant = await api.getTenant();

  // Selecionando o tenant
  if (!tenant) {
    return { redirect: { destination: '/', permanent: false } }
  } // Bloqueando o acesso a tenants/estabelecimentos que não existem e voltando pra pagina inicial.




  return {
    props: {
      tenant,

    }
  }

}
