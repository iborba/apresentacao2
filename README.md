1. npx gts init
1.1 npm install nodemon express ts-node @types/express
1.2 tsconfig.json => 
	"noImplicitAny": false
1.3 package.json => 
	Explicar nodemon
1.4 Copiar arquivo nodemon.json
1.5 código abaixo

		const express = require('express');
		const app = express();

		app.get('/', (_req, res) => {
			res.send('Hello world!!!')
		});

		app.get('/soma', (req, res) => {
			const { v1, v2 } = req.query;

			const result = `Resultado da soma: ${Number(v1) + Number(v2)}`

			res.send(result);
		});

		app.listen(8080);


2.0 Explicar os comandos
------------------
RESOURCE=BEMACASH_PLATAFORMA
CLUSTER=aks-cluster-mpn-dev
LOCATION=brazilsouth
VM_SIZE=Standard_D1_v2
------------------
	** az logout
	2.0 az login
	2.1 az aks create -n $CLUSTER -g $RESOURCE --dns-name-prefix $CLUSTER --generate-ssh-keys --node-count 3 --node-vm-size $VM_SIZE
	** Explicar kubectl e onde fazer download (https://kubernetes.io/docs/tasks/tools/install-kubectl/)
	*** Explicar kubectl completion (https://kubernetes.io/docs/tasks/tools/install-kubectl/)
	
3.0 INICIAR PUBLICAÇÃO
	3.0 Copiar arquivo Dockerfile
		3.1 Adicionar -> RUN apk add --no-cache curl
	3.1 Copiar os arquivos (mpn-libs-ssh-key e ssh-mpn-libs.sh)
	3.1.1 Inserir no package.json
		    "docker:build": "rm -rf package-lock.json && docker build -t registrympn.azurecr.io/apresentacao1 .",
		    "docker:push": "docker push registrympn.azurecr.io/apresentacao1",
    		"docker": "npm run docker:build && npm run docker:push"
	3.2 Mencionar o login no registrympn
	3.3 Executar npm run docker
	3.4 Mencionar que a imagem agora está disponível no registry e rodar o comando abaixo para mostrar...
		az acr repository list --name registrympn --output table
4.0 CONFIGURAR KUBERNETES
** Explicar o kubectl create namespace development e procuction
	* criar arquivo chamado apresentacao.yaml
	* editar o arquivo: CTRL + SPACE e selecionar Deployment
		inserir:
			image: registrympn.azurecr.io/apresentacao1
			dentro de spec:
			  imagePullSecrets:
			  - name: regcred
****
kubectl apply -f --namespace development tchanana
Testar o pod
kubectl exec -it <NOME> /bin/ash
curl "http://localhost:8080/soma?v1=2&v2=3"
****
5.0 PUBLICAR SERVIÇO
 ** Ver arquivo apresentacao.yaml

6.0 Mostrar serviço funcionando, talvez mencionar que na rede não funciona e usar o celular...
7.0 Atribuir DNS

** Pegar o IP do serviço:
	IP=$(kubectl get services service-apresentacao -o yaml | grep ip | grep -Po '(?<=ip: ).*')
	PUBLICIPID=$(az network public-ip list --query "[?ipAddress!=null]|[?contains(ipAddress, '$IP')].[id]" --output tsv)
	****
	az network public-ip update --ids $PUBLICIPID --dns-name <DNS_DESEJADO>
		observar fqdn
url disponível http://apresentacao.brazilsouth.cloudapp.azure.com:8080/soma?v1=20&v2=30


kubectl apply -f k8s/apresentacao_deployment.yaml
kubectl apply -f k8s/apresentacao_service.yaml


kubectl rollout restart deployment apresentacao