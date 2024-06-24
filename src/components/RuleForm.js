import React from 'react';
import TextInput from './TextInput';
import SelectInput from './SelectInput';

const RuleForm = ({ rule, index, handleRuleChange, removeRule }) => {
    const ruleKeys = [
        'night_count', 'booking_dates', 'sailing_dates', 
        'transaction_amount', 'itineraries', 'pax_types', 
        'minimum_pax_count', 'minimum_pax_count_per_cabin'
    ];
    const ruleOperators = {
        'night_count': ['in'],
        'booking_dates': ['in', 'not in'],
        'sailing_dates': ['in', 'not in'],
        'transaction_amount': ['equals', 'gte', 'lte'],
        'itineraries': ['in', 'not in'],
        'pax_types': ['in'],
        'minimum_pax_count': ['equals'],
        'minimum_pax_count_per_cabin': ['equals']
    };

    const valueTypes = {
        'night_count': 'Array',
        'booking_dates': 'Array',
        'sailing_dates': 'Array',
        'transaction_amount': 'Float',
        'itineraries': 'Array',
        'pax_types': 'Array',
        'minimum_pax_count': 'Integer',
        'minimum_pax_count_per_cabin': 'Integer'
    };

    const renderValueInput = (valueType, value, onChange) => {
        switch (valueType) {
            case 'Array':
                return (
                    <TextInput
                        label="Value"
                        name={`value-${index}`}
                        value={value}
                        onChange={onChange}
                    />
                );
            case 'Float':
            case 'Integer':
                return (
                    <TextInput
                        label="Value"
                        name={`value-${index}`}
                        value={value}
                        onChange={onChange}
                        type="number"
                    />
                );
            default:
                return null;
        }
    };

    const key = rule.key;
    const operators = ruleOperators[key] || [];
    const valueType = valueTypes[key];

    return (
        <div className="form-row rule-group">
            <SelectInput 
                label="Key" 
                name={`key-${index}`} 
                value={rule.key} 
                options={ruleKeys} 
                onChange={(e) => handleRuleChange(index, 'key', e.target.value)} 
            />
            <SelectInput 
                label="Operator" 
                name={`operator-${index}`} 
                value={rule.operator} 
                options={operators} 
                onChange={(e) => handleRuleChange(index, 'operator', e.target.value)} 
            />
            {renderValueInput(valueType, rule.value, (e) => handleRuleChange(index, 'value', e.target.value))}
            <button type="button" onClick={() => removeRule(index)} className="btn btn-danger remove-rule-btn">Remove</button>
        </div>
    );
};

export default RuleForm;
