import { useState, useEffect } from 'react';
import CulqiContext from './context';

const culqiMessages = {
  welcome: 'checkout_bienvenido',
  closed: 'checkout_cerrado',
};

const baseCulqiUrl = 'https://checkout.culqi.com';
const culqiId = 'culqi-js';
const culqiUrl = `${baseCulqiUrl}/js/v4`;

const CulqiCheckoutV4 = (props) => {
  const [amount, setAmount] = useState(props.options.amount || 0);
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (props.options.amount) {
      setAmount(props.options.amount);
    }
  }, [props.options.amount]);

  const getCulqiSettings = () => {
    const { currency = 'PEN', description = '', title = '' } = props.options;
    return {
      amount,
      currency,
      description,
      title,
    };
  };

  useEffect(() => {
    if (!props.publicKey) return;
    const script = document.createElement('script');
    script.id = culqiId;
    script.src = culqiUrl;
    script.async = true;
    script.onload = onCulqiLoad;
    const culqiScript = script;
    document.body.appendChild(culqiScript);
    window.addEventListener('message', onCulqiEvent, false);

    return () => {
      if (culqiScript) {
        culqiScript.parentNode.removeChild(culqiScript);
      }
      window.removeEventListener('message', onCulqiEvent, false);
      window.culqi = undefined;
    };
    // eslint-disable-next-line
  }, [props.publicKey]);

  useEffect(() => {
    if (amount) {
      setCulqiSettings(getCulqiSettings());
    }
    // eslint-disable-next-line
  }, [amount]);

  const initCulqi = () => {
    const { publicKey, options = {} } = props;
    const culqiSettings = getCulqiSettings();
    console.log(window.Culqi);
    setCulqiOptions(options);
    window.Culqi.publicKey = publicKey;
    requestAnimationFrame(() => {
      setCulqiSettings(culqiSettings);
    });
    // Patch it so it doesn't throw on browser
    window.culqi = () => {};
  };

  const onCulqiLoad = (e) => {
    if (window.Culqi) {
      initCulqi();
    }
  };

  const onCulqiEvent = (messageEvent) => {
    const { origin, data } = messageEvent;
    const { onClose, onError, onToken } = props;
    if (origin !== baseCulqiUrl) return;

    if (typeof data === 'string' && data === culqiMessages.closed) {
      onClose && onClose();

      initCulqi();
    }

    if (typeof data === 'object') {
      const { object } = data;
      if (!object) return;
      if (object === 'token') {
        setToken(data);
        onToken && onToken(data);
      } else if (object === 'error') {
        setError(data);
        onError && onError(data);
      }
    }
  };
  const openCulqi = () => {
    if (window.Culqi) {
      window.Culqi.open();
    }
  };

  const setCulqiOptions = (userOptions) => {
    if (Object.keys(userOptions).length > 0 && window.Culqi) {
      window.Culqi.options(userOptions);
    }
  };

  const setCulqiSettings = (settings) => {
    if (window.Culqi) {
      window.Culqi.settings(settings);
    }
  };

  useEffect(() => {
    if (!props.publicKey) {
      throw new Error('Please pass along a publicKey prop.');
    }
  }, [props.publicKey]);

  return (
    <CulqiContext.Provider
      value={{
        openCulqi,
        amount,
        token,
        error,
      }}
    >
      {props.children}
    </CulqiContext.Provider>
  );
};

export default CulqiCheckoutV4;
