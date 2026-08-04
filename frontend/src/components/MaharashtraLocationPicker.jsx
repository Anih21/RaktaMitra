// components/MaharashtraLocationPicker.jsx
import React from 'react';

// Example data structure
const DISTRICTS = [{ id: '1', name: 'Nashik' }, { id: '2', name: 'Pune' }];
const TALUKAS = {
  '1': [{ id: '101', name: 'Nashik City' }, { id: '102', name: 'Malegaon' }],
  '2': [{ id: '201', name: 'Haveli' }, { id: '202', name: 'Baramati' }],
};

export default function MaharashtraLocationPicker({ value, onChange }) {
  const handleDistrictChange = (e) => {
    const dId = e.target.value;
    // Update parent state: reset taluka when district changes
    onChange({ district_id: dId, district: DISTRICTS.find(d => d.id === dId)?.name || '', taluka_id: '', taluka: '' });
  };

  const handleTalukaChange = (e) => {
    const tId = e.target.value;
    onChange({ ...value, taluka_id: tId, taluka: TALUKAS[value.district_id]?.find(t => t.id === tId)?.name || '' });
  };

  return (
    <div className="form-row">
      <div className="form-group">
        <select className="form-control" value={value.district_id} onChange={handleDistrictChange} required>
          <option value="">Select District</option>
          {DISTRICTS.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
        </select>
      </div>
      <div className="form-group">
        <select className="form-control" value={value.taluka_id} onChange={handleTalukaChange} disabled={!value.district_id} required>
          <option value="">Select Taluka</option>
          {(TALUKAS[value.district_id] || []).map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
        </select>
      </div>
    </div>
  );
}