import Header from '@/components/Header';
import TripForm from '@/components/TripForm';

export default function HomePage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <Header cycleHours={0} />
            <main className="container mx-auto px-4 py-8">
                <TripForm />
            </main>
        </div>
    );
}