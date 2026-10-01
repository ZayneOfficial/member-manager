import { useState } from 'react';
import '../App.css';

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
        <main className="member-page">
            <header className="page-heading">
                <div>
                    <p className="eyebrow">DIRECTORY</p>
                    <h1>Members</h1>
                    <p className="page-description">Keep your member details organized in one place.</p>
                </div>
                <div className="member-total" aria-live="polite">
                    <span className="total-number">{members.length}</span>
                    <span>{members.length === 1 ? 'member' : 'members'}</span>
                </div>
            </header>

            <section className="member-form-section" aria-labelledby="form-title">
                <div className="section-heading">
                    <div>
                        <p className="eyebrow">MEMBER DETAILS</p>
                        <h2 id="form-title">{editingMemberId ? 'Edit member' : 'Add a member'}</h2>
                    </div>
                </div>
                <form
                    className="member-form"
                    onSubmit={(event) => {
                        event.preventDefault();
                        editingMemberId ? handleUpdateMember() : handleAddMember();
                    }}
                >
                    <label>
                        <span>Name</span>
                        <input
                            type="text"
                            placeholder="e.g. Jordan Lee"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            required
                        />
                    </label>
                    <label>
                        <span>Email</span>
                        <input
                            type="email"
                            placeholder="jordan@example.com"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            required
                        />
                    </label>
                    <label>
                        <span>Phone</span>
                        <input
                            type="tel"
                            placeholder="(555) 123-4567"
                            value={phone}
                            onChange={(event) => setPhone(event.target.value)}
                            required
                        />
                    </label>
                    <div className="form-actions">
                        <button className="primary-button" type="submit">
                            {editingMemberId ? 'Save changes' : 'Add member'}
                        </button>
                        {editingMemberId && (
                            <button
                                className="text-button"
                                type="button"
                                onClick={() => {
                                    setEditingMemberId(null);
                                    setName('');
                                    setEmail('');
                                    setPhone('');
                                }}
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </section>

            <section className="directory-section" aria-labelledby="directory-title">
                <div className="section-heading directory-heading">
                    <div>
                        <p className="eyebrow">YOUR DIRECTORY</p>
                        <h2 id="directory-title">All members</h2>
                    </div>
                </div>
                <div className="table-scroll">
                    <table className="member-table">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Phone</th>
                                <th scope="col" className="actions-heading">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {members.length === 0 ? (
                                <tr>
                                    <td className="empty-state" colSpan="4">
                                        <span className="empty-mark" aria-hidden="true">+</span>
                                        <strong>No members yet</strong>
                                        <span>Add a member above to start your directory.</span>
                                    </td>
                                </tr>
                            ) : (
                                members.map((member) => (
                                    <tr key={member.id}>
                                        <td className="member-name">{member.name}</td>
                                        <td>{member.email}</td>
                                        <td>{member.phone}</td>
                                        <td>
                                            <div className="row-actions">
                                                <button
                                                    className="text-button"
                                                    type="button"
                                                    onClick={() => handleEditMember(member)}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="text-button delete-button"
                                                    type="button"
                                                    onClick={() => handleDeleteMember(member.id)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    );
}

export default MemberManager;