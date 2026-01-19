import { useState } from 'react';
import { CreditCard, Lock } from 'lucide-react';
import toast from 'react-hot-toast';

const PaymentForm = ({ amount, onSuccess }) => {
  const [cardData, setCardData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simular procesamiento de pago
    toast.loading('Procesando pago...', { id: 'payment' });
    
    setTimeout(() => {
      toast.success('¡Pago procesado exitosamente!', { id: 'payment' });
      if (onSuccess) onSuccess();
      setCardData({ cardNumber: '', cardName: '', expiryDate: '', cvv: '' });
    }, 2000);
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    return parts.length ? parts.join(' ') : value;
  };

  return (
    <div className="card max-w-md mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Pago Seguro
        </h2>
        <Lock className="w-6 h-6 text-green-600" />
      </div>

      <div className="mb-6 p-4 bg-primary-50 dark:bg-primary-900/30 rounded-lg">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Monto a pagar:</p>
        <p className="text-3xl font-bold text-primary-700 dark:text-primary-300">
          ${amount || '0.00'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Número de Tarjeta
          </label>
          <div className="relative">
            <input
              type="text"
              value={cardData.cardNumber}
              onChange={(e) => setCardData({ ...cardData, cardNumber: formatCardNumber(e.target.value) })}
              className="input-field pl-10"
              placeholder="1234 5678 9012 3456"
              maxLength="19"
              required
            />
            <CreditCard className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Nombre del Titular
          </label>
          <input
            type="text"
            value={cardData.cardName}
            onChange={(e) => setCardData({ ...cardData, cardName: e.target.value.toUpperCase() })}
            className="input-field"
            placeholder="JUAN PÉREZ"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Fecha de Expiración
            </label>
            <input
              type="text"
              value={cardData.expiryDate}
              onChange={(e) => setCardData({ ...cardData, expiryDate: e.target.value })}
              className="input-field"
              placeholder="MM/AA"
              maxLength="5"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              CVV
            </label>
            <input
              type="password"
              value={cardData.cvv}
              onChange={(e) => setCardData({ ...cardData, cvv: e.target.value.replace(/\D/g, '') })}
              className="input-field"
              placeholder="123"
              maxLength="4"
              required
            />
          </div>
        </div>

        <button type="submit" className="w-full btn-primary py-3 flex items-center justify-center space-x-2">
          <Lock className="w-5 h-5" />
          <span>Pagar ${amount || '0.00'}</span>
        </button>

        <p className="text-xs text-center text-gray-500 dark:text-gray-400">
          <Lock className="w-3 h-3 inline mr-1" />
          Pago seguro encriptado con SSL
        </p>
      </form>
    </div>
  );
};

export default PaymentForm;
