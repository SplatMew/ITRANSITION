import React, { useState } from 'react';
import { Form, Row, Col, InputGroup } from 'react-bootstrap';

const SettingsPanel = ({ onChange }) => {
  const [seed, setSeed] = useState(1);
  const [language, setLanguage] = useState('en');
  const [likes, setLikes] = useState(5);
  const [reviews, setReviews] = useState(5);

  const handleSeedChange = (e) => {
    const newSeed = parseInt(e.target.value, 10);
    setSeed(newSeed);
    onChange({ seed: newSeed, language, likes, reviews });
  };

  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    setLanguage(newLanguage);
    onChange({ seed, language: newLanguage, likes, reviews });
  };

  const handleLikesChange = (e) => {
    const newLikes = parseFloat(e.target.value);
    setLikes(newLikes);
    onChange({ seed, language, likes: newLikes, reviews });
  };

  const handleReviewsChange = (e) => {
    const newReviews = parseFloat(e.target.value);
    setReviews(newReviews);
    onChange({ seed, language, likes, reviews: newReviews });
  };

  return (
    <Form>
      <Row className="mb-3">
        <Col>
          <Form.Label>Seed</Form.Label>
          <Form.Control type="number" value={seed} onChange={handleSeedChange} />
        </Col>
        <Col>
          <Form.Label>Language</Form.Label>
          <Form.Control as="select" value={language} onChange={handleLanguageChange}>
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="ja">Japanese</option>
          </Form.Control>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Label>Likes</Form.Label>
          <InputGroup>
            <Form.Control type="range" min="0" max="10" step="0.1" value={likes} onChange={handleLikesChange} />
            <Form.Control value={likes} readOnly />
          </InputGroup>
        </Col>
        <Col>
          <Form.Label>Reviews</Form.Label>
          <Form.Control type="number" step="0.1" value={reviews} onChange={handleReviewsChange} />
        </Col>
      </Row>
    </Form>
  );
};

export default SettingsPanel;