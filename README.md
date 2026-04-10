# 🍎 NutriScan

**NutriScan** é um aplicativo mobile desenvolvido com React Native e Expo que permite escanear códigos de barras de alimentos, consultar informações nutricionais (via Open Food Facts) e gerenciar um histórico local de produtos escaneados. Ideal para quem deseja tomar decisões mais conscientes sobre alimentação.

## 📱 Funcionalidades

- 📷 **Escanear código de barras** com bounding box animada.
- 🔍 **Buscar informações do produto** (nome, marca, ingredientes, Nutri-Score) na API Open Food Facts.
- 💾 **Armazenamento local** com SQLite (cache dos produtos escaneados, permitindo acesso offline).
- ❤️ **Favoritar produtos** e gerenciar lista de favoritos.
- 🕒 **Histórico automático** de todos os produtos escaneados, com data e hora.
- 🧭 **Navegação entre telas** (Home, Scanner, Detalhes, Favoritos, Histórico).
- 🎨 **Interface amigável** com ícones e imagem personalizada.

## 🛠️ Tecnologias Utilizadas

- [React Native](https://reactnative.dev/) + [Expo](https://expo.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [expo-camera](https://docs.expo.dev/versions/latest/sdk/camera/) – leitura de códigos de barras
- [react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/) – animações da bounding box
- [React Navigation](https://reactnavigation.org/) – navegação entre telas
- [expo-sqlite](https://docs.expo.dev/versions/latest/sdk/sqlite/) – banco de dados local (histórico)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) – persistência de favoritos
- [Open Food Facts API](https://world.openfoodfacts.org/data) – consulta de produtos
- [@expo/vector-icons](https://docs.expo.dev/guides/icons/) – ícones personalizados

## 🚀 Como executar o projeto

### Pré‑requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- Expo CLI (`npm install -g expo-cli`)
- Dispositivo físico com [Expo Go](https://expo.dev/go) ou emulador Android/iOS

### Passo a passo

1. **Clone o repositório**
   ```bash
   git clone https://github.com/sancho157/NutriScan.git
   cd NutriScan
Instale as dependências

bash
npm install
Execute o projeto

bash
npx expo start
Teste no celular

Escaneie o QR Code com o aplicativo Expo Go.

Para testar a câmera, use um código de barras real (ex: produto alimentício).

Nota: Para testes na web, execute npx expo start --web. A câmera pode não funcionar perfeitamente no navegador; recomenda-se o uso no dispositivo físico.

📸 Capturas de Tela
<div align="center"> <img src="https://github.com/user-attachments/assets/22030775-c6f8-4116-866d-d5103af61cce" alt="Tela inicial" width="200" /> <img src="https://github.com/user-attachments/assets/56b9fc8f-f200-4e2c-a269-70433ff07c20" alt="Favoritos" width="200" /> <img src="https://github.com/user-attachments/assets/01d15b0d-fa5e-4490-b2a1-e1effd610139" alt="Histórico" width="200" /> </div>


🔧 Melhorias Futuras
Cadastro manual de produtos (quando não encontrados na API)

Gráfico de evolução nutricional

Compartilhamento de informações por WhatsApp/e-mail

Suporte a mais idiomas

Widget de pesquisa por nome do produto

📄 Licença
Este projeto está sob a licença MIT. Consulte o arquivo LICENSE para mais informações.

✨ Autor
Desenvolvido por Natan Junio.
GitHub | LinkedIn

Agradecimentos

À comunidade Open Food Facts pela base de dados aberta.

Ao time do Expo pelo excelente framework.



   
