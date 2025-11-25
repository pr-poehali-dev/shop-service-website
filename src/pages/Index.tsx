import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
}

interface ContactInfo {
  title: string;
  description: string;
  phone: string;
  email: string;
  telegram: string;
}

const Index = () => {
  const { toast } = useToast();
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [services, setServices] = useState<Service[]>([
    {
      id: '1',
      title: 'Консультация специалиста',
      description: 'Профессиональная консультация по вашему вопросу. Индивидуальный подход и детальный разбор ситуации.',
      price: '5 000 ₽'
    },
    {
      id: '2',
      title: 'Комплексный анализ',
      description: 'Глубокий анализ вашей задачи с предоставлением подробного отчёта и рекомендаций.',
      price: '15 000 ₽'
    },
    {
      id: '3',
      title: 'Полное сопровождение',
      description: 'Полное сопровождение проекта от начала до конца. Включает все этапы работы и поддержку.',
      price: '50 000 ₽'
    }
  ]);

  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    title: 'Свяжитесь с нами',
    description: 'Выберите удобный способ связи',
    phone: '+7 (999) 123-45-67',
    email: 'info@example.com',
    telegram: '@username'
  });

  const [newService, setNewService] = useState<Service>({
    id: '',
    title: '',
    description: '',
    price: ''
  });

  const handleLogin = () => {
    if (loginData.username === 'skzry' && loginData.password === '22') {
      setIsAuthenticated(true);
      setIsLoginMode(false);
      toast({
        title: 'Успешный вход',
        description: 'Добро пожаловать в админ-панель'
      });
    } else {
      toast({
        title: 'Ошибка входа',
        description: 'Неверный логин или пароль',
        variant: 'destructive'
      });
    }
  };

  const handleAddService = () => {
    if (newService.title && newService.description && newService.price) {
      setServices([...services, { ...newService, id: Date.now().toString() }]);
      setNewService({ id: '', title: '', description: '', price: '' });
      toast({
        title: 'Услуга добавлена',
        description: 'Новая услуга успешно добавлена'
      });
    }
  };

  const handleDeleteService = (id: string) => {
    setServices(services.filter(s => s.id !== id));
    toast({
      title: 'Услуга удалена',
      description: 'Услуга успешно удалена'
    });
  };

  const handleUpdateContact = () => {
    toast({
      title: 'Контакты обновлены',
      description: 'Контактная информация успешно обновлена'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted via-background to-muted/50">
      <div className="fixed top-4 right-4 z-50">
        <Button
          onClick={() => {
            setIsAdminOpen(true);
            setIsLoginMode(!isAuthenticated);
          }}
          variant="outline"
          size="sm"
          className="gap-2"
        >
          <Icon name="Settings" size={16} />
          Админ
        </Button>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-primary mb-4">
            Наши услуги
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Профессиональные решения для вашего бизнеса
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <Card
              key={service.id}
              className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-scale-in border-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <CardTitle className="text-2xl text-primary">{service.title}</CardTitle>
                <CardDescription className="text-base mt-2">{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-secondary">{service.price}</div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => setIsContactOpen(true)}
                  className="w-full gap-2 bg-primary hover:bg-secondary"
                  size="lg"
                >
                  <Icon name="MessageCircle" size={20} />
                  Связаться
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl">{contactInfo.title}</DialogTitle>
            <DialogDescription className="text-base">{contactInfo.description}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <a
              href={`tel:${contactInfo.phone}`}
              className="flex items-center gap-3 p-4 rounded-lg hover:bg-muted transition-colors"
            >
              <Icon name="Phone" size={24} className="text-primary" />
              <div>
                <div className="font-medium">Телефон</div>
                <div className="text-muted-foreground">{contactInfo.phone}</div>
              </div>
            </a>
            <a
              href={`mailto:${contactInfo.email}`}
              className="flex items-center gap-3 p-4 rounded-lg hover:bg-muted transition-colors"
            >
              <Icon name="Mail" size={24} className="text-primary" />
              <div>
                <div className="font-medium">Email</div>
                <div className="text-muted-foreground">{contactInfo.email}</div>
              </div>
            </a>
            <a
              href={`https://t.me/${contactInfo.telegram.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-lg hover:bg-muted transition-colors"
            >
              <Icon name="Send" size={24} className="text-primary" />
              <div>
                <div className="font-medium">Telegram</div>
                <div className="text-muted-foreground">{contactInfo.telegram}</div>
              </div>
            </a>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isAdminOpen} onOpenChange={setIsAdminOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Админ-панель</DialogTitle>
            <DialogDescription>
              {isLoginMode ? 'Войдите для управления сайтом' : 'Управление услугами и контактами'}
            </DialogDescription>
          </DialogHeader>

          {isLoginMode ? (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Логин</label>
                <input
                  type="text"
                  value={loginData.username}
                  onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="skzry"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Пароль</label>
                <input
                  type="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="••••"
                />
              </div>
              <Button onClick={handleLogin} className="w-full" size="lg">
                Войти
              </Button>
            </div>
          ) : (
            <div className="space-y-6 py-4">
              <div>
                <h3 className="text-lg font-semibold mb-4">Управление услугами</h3>
                <div className="space-y-4 mb-4">
                  <input
                    type="text"
                    placeholder="Название услуги"
                    value={newService.title}
                    onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <textarea
                    placeholder="Описание услуги"
                    value={newService.description}
                    onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary min-h-[80px]"
                  />
                  <input
                    type="text"
                    placeholder="Цена (например: 5 000 ₽)"
                    value={newService.price}
                    onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <Button onClick={handleAddService} className="w-full gap-2">
                    <Icon name="Plus" size={16} />
                    Добавить услугу
                  </Button>
                </div>
                <div className="space-y-2">
                  {services.map((service) => (
                    <div key={service.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium">{service.title}</div>
                        <div className="text-sm text-muted-foreground">{service.price}</div>
                      </div>
                      <Button
                        onClick={() => handleDeleteService(service.id)}
                        variant="destructive"
                        size="sm"
                      >
                        <Icon name="Trash2" size={16} />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Контактная информация</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Заголовок"
                    value={contactInfo.title}
                    onChange={(e) => setContactInfo({ ...contactInfo, title: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <input
                    type="text"
                    placeholder="Описание"
                    value={contactInfo.description}
                    onChange={(e) => setContactInfo({ ...contactInfo, description: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <input
                    type="text"
                    placeholder="Телефон"
                    value={contactInfo.phone}
                    onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={contactInfo.email}
                    onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <input
                    type="text"
                    placeholder="Telegram (например: @username)"
                    value={contactInfo.telegram}
                    onChange={(e) => setContactInfo({ ...contactInfo, telegram: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <Button onClick={handleUpdateContact} className="w-full gap-2">
                    <Icon name="Save" size={16} />
                    Сохранить контакты
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
