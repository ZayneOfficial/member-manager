import React, { useState } from 'react';

function MemberManager() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [members, setMembers] = useState([]);
    const [editingMemberId, setEditingMemberId] = useState(null);

    function handleAddMember() {
        if (name && email && phone) {
            const newMember = { id: Date.now(), name, email, phone };
            setMembers([...members, newMember]);
            setName('');
            setEmail('');
            setPhone('');
        }
    }

    function handleEditMember(member) {
        setEditingMemberId(member.id);
        setName(member.name);
        setEmail(member.email);
        setPhone(member.phone);
    }

    function handleUpdateMember() {
        if (name && email && phone) {
            const updatedMembers = members.map((member) =>
                member.id === editingMemberId ? { ...member, name, email, phone } : member
            );
            setMembers(updatedMembers);
            setEditingMemberId(null);
            setName('');
            setEmail('');
            setPhone('');
        }
    }

    function handleDeleteMember(id) {
        const updatedMembers = members.filter((member) => member.id !== id);
        setMembers(updatedMembers);
    }

    return (
        <div>
            <h2>Member Manager</h2>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="tel"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />
            {editingMemberId ? (
                <button onClick={handleUpdateMember}>Update Member</button>
            ) : (
                <button onClick={handleAddMember}>Add Member</button>
            )}
            <ul>
                {members.map((member) => (
                    <li key={member.id}>
                        {member.name} - {member.email} - {member.phone}
                        <button onClick={() => handleEditMember(member)}>Edit</button>
                        <button onClick={() => handleDeleteMember(member.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MemberManager;