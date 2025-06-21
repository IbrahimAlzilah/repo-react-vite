import { useState, useEffect } from 'react';

function MouseTracker() {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        // إضافة event listener عند تحميل المكون
        window.addEventListener('mousemove', handleMouseMove);
        console.log('تم إضافة event listener للحركة الفأرة.');

        // دالة التنظيف: تُنفذ عند إزالة المكون (unmount)
        // أو قبل إعادة تنفيذ الـ effect في حال تغيرت التبعيات
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            console.log('تم إزالة event listener للحركة الفأرة.');
        };
    }, []); // مصفوفة تبعيات فارغة: يُنفذ مرة واحدة فقط عند التحميل والإزالة

    return (
        <div className='border rounded-lg text-center p-3 m-4'>
            <h2>متتبع حركة الفأرة</h2>
            <p>X: {position.x}, Y: {position.y}</p>
        </div>
    );
}

export default MouseTracker;