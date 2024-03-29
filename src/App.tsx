import './App.css'

const domainName = import.meta.env.NGROK_DOMAIN
const testUser = {
  name : "TestUser",
  displayName : "Test User"
}

const publicKeyCreate = {
  publicKey: {
    challenge: new Uint8Array(16),
    rp: {
      id: domainName,
      name: "WebAuthN Test Domain"
    },
    user: {
      id: new Uint8Array([1,2,3,4,5,6]), 
      name: testUser.name,
      displayName: testUser.displayName
    },
    pubKeyCredParams: [ {
      type: "public-key", 
      alg: -7
    } 
  ],
    extensions: {
      largeBlob: {
        //support: "required",
      },
    }
  }
} as CredentialCreationOptions

var publicKeyWrite = {
  publicKey : {
    user: {
      id: new Uint8Array([1,2,3,4,5,6]), 
      name: testUser.name,
      displayName: testUser.displayName
    },
    challenge: new Uint8Array(16),
    rpId: domainName,
    userVerification: "required",
    extensions: {
      largeBlob: {
        write: new TextEncoder().encode("Super Secret Password")
    }
  },
  allowCredentials: []
}
} as CredentialRequestOptions

const publicKeyRead = {
  publicKey : {
    user: {
      id: new Uint8Array([1,2,3,4,5,8]), 
      name: testUser.name,
      displayName: testUser.displayName
    },
    challenge: new Uint8Array(16),
    rpId: domainName,
    userVerification: "required",
    extensions: {
      //@ts-ignore
      largeBlob: {
        read: true
    }
  }
}
} as CredentialRequestOptions

async function createCredential() {
  console.log("Creating Credentials");

  const publicKeyCred = await navigator.credentials.create(publicKeyCreate) as PublicKeyCredential;
  const res = publicKeyCred.getClientExtensionResults()
  console.log(JSON.stringify(res))
  return publicKeyCred.rawId;
}

async function writeBlob(createdUserIdBuffer : ArrayBuffer) {
console.log("Writing Blob");

const user : PublicKeyCredentialDescriptor =
{
  id: createdUserIdBuffer,
  type: "public-key"
}

publicKeyWrite.publicKey?.allowCredentials?.push(user);

setTimeout(async() => {
  navigator.credentials.get(publicKeyWrite)
  .then((cred) => {
    const res = (cred as PublicKeyCredential).getClientExtensionResults() as any
    if(res.largeBlob.written != true)
    {
      console.log("Could not write blob");
      return;
    }
  })
  .catch((err) => {
    console.log(err)
    return;
  }
  )
  .then(() => {readBlob()})
  .catch((err) => {
    console.log(err)
    return;
  })
  }, 500) //Fixing a Safari bug
}

async function readBlob() {
  console.log("Reading Blob");

  setTimeout(async() => {
    navigator.credentials.get(publicKeyRead)
    .then((cred) => {
      const res : any = (cred as PublicKeyCredential).getClientExtensionResults()
      if(res.largeBlob.blob == undefined) {
        console.log("Could not read the largeBlob content")
      }
      else {
        console.log(`The largeBlob's content is: ${new TextDecoder().decode(res.largeBlob.blob)}`)
      }
    })
    .catch((err) => {console.log(err)})}, 500) //Fixing a Safari bug
  }

async function testWebAuthN() {
  console.log("Testing webAuthN");
  const user = await createCredential();
  await writeBlob(user);
}

function App() {
  return (
    <>
      <div className="card">
        <button onClick={() => testWebAuthN()}>
          Try WebAuthN
        </button>
      </div>
    </>
  )
}

export default App
