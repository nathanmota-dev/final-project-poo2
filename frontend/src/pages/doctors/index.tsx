import { useState } from 'react';
import api from '../../api/api';

export default function Doctors() {
    const [name, setName] = useState('');
    const [crm, setCrm] = useState('');
    const [specialty, setSpecialty] = useState('');
    const [telephone, setTelephone] = useState('');
    const [doctorCrm, setDoctorCrm] = useState('');
    const [doctorData, setDoctorData] = useState<any>(null);
    const [message, setMessage] = useState('');

    // Função para cadastrar um novo médico
    const handleCreateDoctor = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setMessage('');

        try {
            await api.post('/doctor/create', {
                name,
                crm,
                specialty,
                telephone
            });
            setMessage('Médico cadastrado com sucesso!');
            setName('');
            setCrm('');
            setSpecialty('');
            setTelephone('');
        } catch (error) {
            setMessage('Erro ao cadastrar médico. Tente novamente.');
            console.error(error);
        }
    };

    // Função para buscar um médico pelo CRM
    const handleFetchDoctorByCrm = async () => {
        setMessage('');
        setDoctorData(null);

        try {
            const response = await api.get(`/doctor/search?crm=${doctorCrm}`);
            setDoctorData(response.data);
        } catch (error) {
            setMessage('Erro ao buscar médico. Verifique o CRM e tente novamente.');
            console.error(error);
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Gerenciamento de Médicos</h2>

            {/* Cadastro de Médico */}
            <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Cadastrar Novo Médico</h3>
                <form onSubmit={handleCreateDoctor} className="space-y-4">
                    <div>
                        <label className="block text-gray-700">Nome</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 p-2 border border-gray-300 rounded w-full"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">CRM</label>
                        <input
                            type="text"
                            value={crm}
                            onChange={(e) => setCrm(e.target.value)}
                            className="mt-1 p-2 border border-gray-300 rounded w-full"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Especialidade</label>
                        <input
                            type="text"
                            value={specialty}
                            onChange={(e) => setSpecialty(e.target.value)}
                            className="mt-1 p-2 border border-gray-300 rounded w-full"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Telefone</label>
                        <input
                            type="text"
                            value={telephone}
                            onChange={(e) => setTelephone(e.target.value)}
                            className="mt-1 p-2 border border-gray-300 rounded w-full"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white p-2 rounded mt-4 hover:bg-blue-700"
                    >
                        Cadastrar Médico
                    </button>
                </form>
                {message && <p className="mt-4 text-center text-red-600">{message}</p>}
            </div>

            {/* Buscar Médico pelo CRM */}
            <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Buscar Médico por CRM</h3>
                <div className="flex space-x-4">
                    <input
                        type="text"
                        placeholder="Digite o CRM do médico"
                        value={doctorCrm}
                        onChange={(e) => setDoctorCrm(e.target.value)}
                        className="p-2 border border-gray-300 rounded w-full"
                    />
                    <button
                        onClick={handleFetchDoctorByCrm}
                        className="bg-green-600 text-white p-2 rounded hover:bg-green-700"
                    >
                        Buscar
                    </button>
                </div>
                {doctorData && doctorData.length > 0 && (
                    <div className="mt-4 p-4 border border-gray-300 rounded bg-gray-50">
                        <h4 className="font-semibold">Dados do Médico:</h4>
                        <p><strong>CRM:</strong> {doctorData[0].crm}</p>
                        <p><strong>Nome:</strong> {doctorData[0].name}</p>
                        <p><strong>Especialidade:</strong> {doctorData[0].specialty}</p>
                        <p><strong>Telefone:</strong> {doctorData[0].telephone}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
