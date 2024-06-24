import React, { useState } from 'react';
import axios from 'axios';
import TextInput from './TextInput';
import NumberInput from './NumberInput';
import SelectInput from './SelectInput';
import DateInput from './DateInput';
import CheckboxInput from './CheckBoxInput';
import RuleForm from './RuleForm';
import Sidebar from './SideBar';
import './CouponForm.css';

const CouponForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        couponCode: '',
        limitPerUser: '',
        fareType: 'special_fare',
        bookingPortal: '',
        discountType: 'flat',
        validFrom: '',
        validTill: '',
        successMessage: '',
        minNightBooking: false,
        operator: 'in',
        value: 1,
        rules: []
    });

    const fareTypes = ['special_fare', 'normal_fare'];
    const bookingPortals = ['b2c', 'b2c-q', 'b2c-m', 'b2c-weekend', 'b2b'];
    const discountTypes = ['flat', 'percentage'];

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleRuleChange = (index, field, value) => {
        const newRules = formData.rules.map((rule, i) => 
            i === index ? { ...rule, [field]: value } : rule
        );
        setFormData((prevData) => ({
            ...prevData,
            rules: newRules
        }));
    };

    const addRule = () => {
        setFormData((prevData) => ({
            ...prevData,
            rules: [...prevData.rules, { key: '', operator: '', value: '' }]
        }));
    };

    const removeRule = (index) => {
        const newRules = formData.rules.filter((_, i) => i !== index);
        setFormData((prevData) => ({
            ...prevData,
            rules: newRules
        }));
    };

  

    const handleSubmit = (e) => {
        e.preventDefault();
        const coupon = {
            ...formData,
            applies_to: [formData.fareType],
            portals: [formData.bookingPortal],
            discount_pct: formData.discountType === 'percentage' ? formData.value : null,
            valid_from: new Date(formData.validFrom).toISOString(),
            valid_till: new Date(formData.validTill).toISOString(),
            rules_json: formData.rules.map(rule => ({
                key: rule.key,
                operator: rule.operator,
                value: rule.value ? (isNaN(rule.value) ? rule.value.split(',') : [parseInt(rule.value)]) : null
            }))
        };

        axios.post('/api/coupons', { coupon })
            .then(response => {
                alert('Coupon created successfully!');
                setFormData({
                    name: '',
                    couponCode: '',
                    limitPerUser: '',
                    fareType: 'special_fare',
                    bookingPortal: '',
                    discountType: 'flat',
                    validFrom: '',
                    validTill: '',
                    successMessage: '',
                    minNightBooking: false,
                    operator: 'in',
                    value: 1,
                    rules: []
                });
            })
            .catch(error => {
                console.error('There was an error creating the coupon!', error);
            });
    };

    return (
        <div className="main-container">
            <Sidebar />
            <div className="content">
                <h1 className="form-title">Add Coupon</h1>
                <form onSubmit={handleSubmit} className="coupon-form">
                    <div className="form-row">
                        <TextInput label="Name" name="name" value={formData.name} onChange={handleChange} />
                        <TextInput label="Coupon Code" name="couponCode" value={formData.couponCode} onChange={handleChange} />
                        <NumberInput label="Limit Per User" name="limitPerUser" value={formData.limitPerUser} onChange={handleChange} />
                    </div>
                    <div className="form-row">
                        <SelectInput label="Fare Type" name="fareType" value={formData.fareType} options={fareTypes} onChange={handleChange} />
                        <SelectInput label="Booking Portal" name="bookingPortal" value={formData.bookingPortal} options={bookingPortals} onChange={handleChange} />
                    </div>
                    <div className="form-row">
                        <SelectInput label="Discount Type" name="discountType" value={formData.discountType} options={discountTypes} onChange={handleChange} />
                    </div>
                    <div className="form-row">
                        <DateInput label="Valid From" name="validFrom" value={formData.validFrom} onChange={handleChange} />
                        <DateInput label="Valid Till" name="validTill" value={formData.validTill} onChange={handleChange} />
                        <TextInput label="Success Message" name="successMessage" value={formData.successMessage} onChange={handleChange} />
                    </div>
                    <h3>Coupon Rules</h3>
                    <div className="form-row">
                        <CheckboxInput label="Minimum nights in booking" name="minNightBooking" checked={formData.minNightBooking} onChange={handleChange} />
                        <SelectInput label="Operator" name="operator" value={formData.operator} options={['in', 'equals']} onChange={handleChange} />
                        <NumberInput label="Value" name="value" value={formData.value} onChange={handleChange} />
                        <button type="button" onClick={addRule} className="btn btn-secondary add-rule-btn">+</button>
                    </div>
                   
                    {formData.rules.map((rule, index) => (
                        <RuleForm
                            key={index}
                            index={index}
                            rule={rule}
                            handleRuleChange={handleRuleChange}
                            removeRule={removeRule}
                        />
                    ))}
                    <button type="submit" className="btn btn-primary submit-btn">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default CouponForm;
