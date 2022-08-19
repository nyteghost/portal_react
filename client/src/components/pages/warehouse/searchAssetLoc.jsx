import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

const SearchAssetLoc = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'Right',
        height: '100vh'
      }}
    >
      <Form>
      <Row className="align-items-center">
        <Col xs="auto">
          <Form.Label htmlFor="inlineFormInput" visuallyHidden>
            Name
          </Form.Label>
          <Form.Control
            className="mb-2"
            id="inlineFormInput"
            placeholder="Asset#/SN#"
          />
        </Col> 
        <Col xs="auto">
          <Button type="submit" className="mb-2">
            Submit
          </Button>
        </Col>
      </Row>
    </Form>


{/*     
    <form name="Form" action="/warehouse/assetLocationSearch" id="assetLocSearch-form" method="post">
        <div class="form-group">
            <label for="assetLocSearch">Asset#/SN#:</label>
            <input type="text" name="assetLocSearch" id="assetLocSearch"></input>
        </div>
        <button id="submit" class="btn btn-success btn-padding" >Submit</button>
    </form> */}
    </div>
  );
};
  
export default SearchAssetLoc;