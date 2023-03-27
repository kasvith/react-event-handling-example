import { useEffect, useState } from 'react';

const Row = ({ children }: { children: React.ReactNode }) => {
  return <div style={{ flexDirection: 'row' }}>{children}</div>;
};
const Col = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      style={{
        flexDirection: 'column',
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'start',
        padding: '10px',
      }}
    >
      {children}
    </div>
  );
};

interface GeneralInfoProps {
  onChange?: (data: any) => void;
}

const GeneralInfo = ({ onChange }: GeneralInfoProps) => {
  // i ve used a very simple example to mimic our actual usecase
  // we have bunch of states, which are updating independent from each other
  // not like in mouseX, mouseY case in the doc

  // so we are using 3 separate state values
  // in real scenario, we might even pass a prop with initialData
  // i omited it for brevity

  // there can be many independent states..i just added only 3
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productTagline, setProductTagline] = useState('');

  const handleProductNameChange = (e: any) => {
    setProductName(e?.target?.value);
    // other solution according to toggle example is to have onChange fire here
    // this seems rather ugly to have around when state grows

    // onChange?.({
    //   productName: e?.target?.value,
    //   productDescription,
    //   productTagline,
    // });
  };
  const handleProductDescriptionChange = (e: any) => {
    setProductDescription(e?.target?.value);

    // onChange?.({
    //   productDescription: e?.target?.value,
    //   productName,
    //   productTagline,
    // });
  };
  const handleProductTaglineChange = (e: any) => {
    setProductTagline(e?.target?.value);

    // onChange?.({
    //   productTagline: e?.target?.value,
    //   productName,
    //   productDescription,
    // });
  };

  // we can use effect to fire changes when something
  // happens to the state(which is independent from other inputs)
  // i ve uncommented this as it was our natual solution
  useEffect(() => {
    onChange?.({ productName, productDescription, productTagline });
  }, [productName, productDescription, productTagline]);

  return (
    <Col>
      <Row>
        <strong>General Details:</strong>
      </Row>
      <Row>
        <label htmlFor="productName">Product Name: </label>
        <input
          name="productName"
          type="text"
          value={productName}
          onInput={handleProductNameChange}
        />
      </Row>
      <Row>
        <label htmlFor="productDescription">Product Description: </label>
        <input
          name="productDescription"
          type="text"
          value={productDescription}
          onInput={handleProductDescriptionChange}
        />
      </Row>
      <Row>
        <label htmlFor="productTagline">Product Tagline: </label>
        <input
          name="productTagline"
          type="text"
          value={productTagline}
          onInput={handleProductTaglineChange}
        />
      </Row>
    </Col>
  );
};

interface ShippingInfoProps {
  onChange?: (data: any) => void;
}

const ShippingInfo = ({ onChange }: ShippingInfoProps) => {
  const [shippingMethod, setShippingMethod] = useState('');
  const [sameDayCollection, setSameDayCollection] = useState(false);

  const handleShippingMethodChange = (e: any) => {
    setShippingMethod(e?.target?.value);

    // onChange?.({
    //   shippingMethod: e?.target?.value,
    //   sameDayCollection,
    // });
  };
  const handleSameDayCollectionChange = () => {
    setSameDayCollection((prev) => !prev);

    // onChange?.({
    //   sameDayCollection, // should we do this inside the setter?
    //   shippingMethod,
    // });
  };

  // we can use effect to fire changes when something
  // happens to the state(which is independent from other inputs)
  // i ve uncommented this as it was our natual solution
  useEffect(() => {
    onChange?.({ shippingMethod, sameDayCollection });
  }, [shippingMethod, sameDayCollection]);

  return (
    <Col>
      <Row>
        <strong>Shipping Details:</strong>
      </Row>
      <Row>
        <label htmlFor="shippingMethod">Shipping Method: </label>
        <input
          name="shippingMethod"
          type="text"
          value={shippingMethod}
          onInput={handleShippingMethodChange}
        />
      </Row>
      <Row>
        <label htmlFor="productDescription">Same Day Collection: </label>
        <input
          name="productDescription"
          type="checkbox"
          checked={sameDayCollection}
          onChange={handleSameDayCollectionChange}
        />
      </Row>
    </Col>
  );
};

const ProductForm = () => {
  const [product, setProduct] = useState({});

  // here we accumulate all the data for persistance
  const handleGeneralFormData = (data: any) => {
    setProduct((prev) => ({ ...prev, general: data }));
  };

  const handleShippingFormData = (data: any) => {
    setProduct((prev) => ({ ...prev, shipping: data }));
  };

  const submitForm = () => {
    // do submission
    console.log('submit', product);
  };

  return (
    <>
      <GeneralInfo onChange={handleGeneralFormData} />
      <ShippingInfo onChange={handleShippingFormData} />
      <button onClick={submitForm}>Submit</button>
      {/* There can be many forms like this */}
      <div style={{ textAlign: 'left' }}>
        State:
        <pre>
          <code>{JSON.stringify(product, null, 2)}</code>
        </pre>
      </div>
    </>
  );
};

export default ProductForm;
