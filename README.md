# REACT-CULQI-FULL

A React library for integration with the Culqi payment processor, compatible with Next.js

## Installation

```bash
npm install react-culqi-full
```

## Usage

```js
import { useState } from "react";
import { CulqiProviderV3, CulqiProviderV4, Culqi } from "react-culqi-full";

const MyComponentWithCulqiV3 = () => {
  const [amount, setAmount] = useState(10000);
  const [title, setTitle] = useState("White T-shirt");
  const [description, setDescription] = useState("product description");
  return (
    <>
      <CulqiProviderV3
        publicKey="your_public_key"
        onToken={(token) => {
          //send the token to your backend to validate the charge
        }}
        onError={(error) => {
          //here you can handle the errors as you want
        }}
        onClose={(token) => {
          //perform actions when Culqi form is closed
        }}
        options={{
          title: title,
          description: description,
          amount: amount,
          style: {
            bgcolor: "",
            buttontext: "",
            desctext: "",
            disabledcolor: "",
            logo: "your_logo.png/jpg",
            maincolor: "",
            maintext: "",
          },
        }}
      >
        <>
          <Culqi>
            {({ openCulqi }) => {
              return (
                <button onClick={openCulqi} type="button">
                  Pagar
                </button>
              );
            }}
          </Culqi>
        </>
      </CulqiProviderV3>
    </>
  );
};

const MyComponentWithCulqiV4 = () => {
  const [amount, setAmount] = useState(10000);
  const [title, setTitle] = useState("White T-shirt");
  const [description, setDescription] = useState("product description");
  return (
    <>
      <CulqiProviderV4
        publicKey="your_public_key"
        onToken={(token) => {
          //send the token to your backend to validate the charge
        }}
        onError={(error) => {
          //here you can handle the errors as you want
        }}
        onClose={(token) => {
          //perform actions when Culqi form is closed
        }}
        options={{
          title: title,
          description: description,
          amount: amount,
          style: {
            bannerColor: "",
            logo: "your_logo.png/jpg",
            buttonBackground: "",
            buttontext: "",
            linksColor: "",
            menuColor: "",
            priceColor: "",
          },
          paymentMethods: {
            tarjeta: true,
            yape: false,
          },
        }}
      >
        <>
          <Culqi>
            {({ openCulqi }) => {
              return (
                <button onClick={openCulqi} type="button">
                  Pagar
                </button>
              );
            }}
          </Culqi>
        </>
      </CulqiProviderV4>
    </>
  );
};
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
