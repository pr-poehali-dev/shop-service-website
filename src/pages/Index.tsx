import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
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
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([
    {
      id: '1',
      title: 'Творческий проект',
      description: 'Описание вашего проекта',
      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800'
    },
    {
      id: '2',
      title: 'Дизайн концепт',
      description: 'Современный минималистичный дизайн',
      imageUrl: 'https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?w=800'
    },
    {
      id: '3',
      title: 'Визуальное искусство',
      description: 'Экспериментальная работа',
      imageUrl: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800'
    }
  ]);

  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    title: 'Свяжитесь со мной',
    description: 'Выберите удобный способ связи',
    phone: '+7 (999) 123-45-67',
    email: 'info@example.com',
    telegram: '@username'
  });

  const [newItem, setNewItem] = useState<PortfolioItem>({
    id: '',
    title: '',
    description: '',
    imageUrl: ''
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

  const handleAddItem = () => {
    if (newItem.title && newItem.description && newItem.imageUrl) {
      setPortfolioItems([...portfolioItems, { ...newItem, id: Date.now().toString() }]);
      setNewItem({ id: '', title: '', description: '', imageUrl: '' });
      toast({
        title: 'Работа добавлена',
        description: 'Новая работа успешно добавлена в портфолио'
      });
    }
  };

  const handleDeleteItem = (id: string) => {
    setPortfolioItems(portfolioItems.filter(item => item.id !== id));
    toast({
      title: 'Работа удалена',
      description: 'Работа успешно удалена из портфолио'
    });
  };

  const handleUpdateContact = () => {
    toast({
      title: 'Контакты обновлены',
      description: 'Контактная информация успешно обновлена'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="fixed top-6 right-6 z-50">
        <Button
          onClick={() => {
            setIsAdminOpen(true);
            setIsLoginMode(!isAuthenticated);
          }}
          variant="ghost"
          size="icon"
          className="rounded-full bg-background/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all"
        >
          <Icon name="Settings" size={20} />
        </Button>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-20 animate-fade-in">
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent mb-6">
            Портфолио
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto font-light">
            Коллекция избранных работ
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {portfolioItems.map((item, index) => (
            <Card
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group overflow-hidden cursor-pointer animate-scale-in border-0 shadow-lg hover:shadow-2xl transition-all duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-200 line-clamp-2">{item.description}</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button
            onClick={() => setIsContactOpen(true)}
            size="lg"
            className="gap-2 px-8 py-6 text-lg rounded-full shadow-xl hover:shadow-2xl transition-all"
          >
            <Icon name="Mail" size={20} />
            Связаться
          </Button>
        </div>
      </div>

      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="sm:max-w-4xl p-0 overflow-hidden">
          {selectedItem && (
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative aspect-square md:aspect-auto">
                <img
                  src={selectedItem.imageUrl}
                  alt={selectedItem.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <h2 className="text-3xl font-bold mb-4 text-primary">{selectedItem.title}</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">{selectedItem.description}</p>
                <Button
                  onClick={() => setIsContactOpen(true)}
                  className="mt-8 gap-2"
                  size="lg"
                >
                  <Icon name="MessageCircle" size={20} />
                  Обсудить проект
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl">{contactInfo.title}</DialogTitle>
            <DialogDescription className="text-base">{contactInfo.description}</DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-4">
            <a
              href={`tel:${contactInfo.phone}`}
              className="flex items-center gap-4 p-4 rounded-xl hover:bg-muted/50 transition-all group"
            >
              <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <Icon name="Phone" size={20} className="text-primary" />
              </div>
              <div>
                <div className="font-medium text-sm text-muted-foreground">Телефон</div>
                <div className="text-lg">{contactInfo.phone}</div>
              </div>
            </a>
            <a
              href={`mailto:${contactInfo.email}`}
              className="flex items-center gap-4 p-4 rounded-xl hover:bg-muted/50 transition-all group"
            >
              <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <Icon name="Mail" size={20} className="text-primary" />
              </div>
              <div>
                <div className="font-medium text-sm text-muted-foreground">Email</div>
                <div className="text-lg">{contactInfo.email}</div>
              </div>
            </a>
            <a
              href={`https://t.me/${contactInfo.telegram.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-xl hover:bg-muted/50 transition-all group"
            >
              <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <Icon name="Send" size={20} className="text-primary" />
              </div>
              <div>
                <div className="font-medium text-sm text-muted-foreground">Telegram</div>
                <div className="text-lg">{contactInfo.telegram}</div>
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
              {isLoginMode ? 'Войдите для управления портфолио' : 'Управление работами и контактами'}
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
                  className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  placeholder="skzry"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Пароль</label>
                <input
                  type="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
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
                <h3 className="text-lg font-semibold mb-4">Управление работами</h3>
                <div className="space-y-4 mb-4 p-4 bg-muted/30 rounded-xl">
                  <input
                    type="text"
                    placeholder="Название работы"
                    value={newItem.title}
                    onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                    className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  />
                  <textarea
                    placeholder="Описание работы"
                    value={newItem.description}
                    onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                    className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary min-h-[100px] transition-all"
                  />
                  <input
                    type="url"
                    placeholder="URL изображения (например: https://...)"
                    value={newItem.imageUrl}
                    onChange={(e) => setNewItem({ ...newItem, imageUrl: e.target.value })}
                    className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  />
                  {newItem.imageUrl && (
                    <div className="relative aspect-video rounded-xl overflow-hidden border-2">
                      <img
                        src={newItem.imageUrl}
                        alt="Предпросмотр"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = '';
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                  <Button onClick={handleAddItem} className="w-full gap-2">
                    <Icon name="Plus" size={16} />
                    Добавить работу
                  </Button>
                </div>
                <div className="space-y-2">
                  {portfolioItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 p-3 border rounded-xl">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="font-medium">{item.title}</div>
                        <div className="text-sm text-muted-foreground line-clamp-1">{item.description}</div>
                      </div>
                      <Button
                        onClick={() => handleDeleteItem(item.id)}
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
                <div className="space-y-4 p-4 bg-muted/30 rounded-xl">
                  <input
                    type="text"
                    placeholder="Заголовок"
                    value={contactInfo.title}
                    onChange={(e) => setContactInfo({ ...contactInfo, title: e.target.value })}
                    className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  />
                  <input
                    type="text"
                    placeholder="Описание"
                    value={contactInfo.description}
                    onChange={(e) => setContactInfo({ ...contactInfo, description: e.target.value })}
                    className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  />
                  <input
                    type="text"
                    placeholder="Телефон"
                    value={contactInfo.phone}
                    onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                    className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={contactInfo.email}
                    onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                    className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  />
                  <input
                    type="text"
                    placeholder="Telegram (например: @username)"
                    value={contactInfo.telegram}
                    onChange={(e) => setContactInfo({ ...contactInfo, telegram: e.target.value })}
                    className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
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
