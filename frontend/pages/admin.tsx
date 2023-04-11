import React, { useEffect, useState } from "react";
import styles from "../styles/Admin.module.scss";
import ConnectionForm from "../components/ConnectionForm/ConnectionForm";
import NewPostForm from "../components/NewPostForm/NewWorkForm";

export default function Admin() {
  const [admin, setAdmin] = useState(false);
  const [readyToRender, setReadyToRender] = useState(false);

  useEffect(() => {
    checkIsAdmin();
    
  // window.fbAsyncInit = function() {
  //   FB.init({
  //     appId      : '{your-app-id}',
  //     cookie     : true,
  //     xfbml      : true,
  //     version    : '{api-version}'
  //   });
      
  //   FB.AppEvents.logPageView();   
      
  // };

  // (function(d, s, id){
  //    var js, fjs = d.getElementsByTagName(s)[0];
  //    if (d.getElementById(id)) {return;}
  //    js = d.createElement(s); js.id = id;
  //    js.src = "https://connect.facebook.net/en_US/sdk.js";
  //    fjs.parentNode.insertBefore(js, fjs);
  //  }(document, 'script', 'facebook-jssdk'));
  }, []);



  const checkIsAdmin = () => {
    const stockedToken = window.sessionStorage.getItem("token");
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/${stockedToken}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.isAdmin) {
          setAdmin(true);
        } else {
          setAdmin(false);
        }
        setReadyToRender(true);
      })
      .catch((err) => console.log(err));
  };

  const deleteTokenFromSessionStorage = () => {
    window.sessionStorage.removeItem("token");
    checkIsAdmin();
  };

  return (
    <>
      {readyToRender && (
        <div className={styles.admin}>
          {admin ? (
            <div>
              <h2>Ajouter une oeuvre</h2>
              <NewPostForm />
              <div className={styles.logoutBtn}>
                <button onClick={() => deleteTokenFromSessionStorage()}>Déconnexion</button>
              </div>
            </div>
          ) : (
            <ConnectionForm setAdmin={setAdmin} />
          )}
        </div>
      )}
    </>
  );
}
