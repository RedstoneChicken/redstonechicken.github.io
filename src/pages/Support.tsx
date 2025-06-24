import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ExternalLink, MessageSquare, Download, Info, HelpCircle, Youtube, MessageCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const Support = () => {
  const {
    toast
  } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("installation");
  const [activePlatform, setActivePlatform] = useState("windows");
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "Thank you for your message. We'll get back to you soon."
      });
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
      setIsSubmitting(false);
    }, 1500);
  };
  
  return <div className="min-h-screen bg-background font-montserrat">
      <div className="max-w-7xl mx-auto py-8 px-6 animate-fade-in">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Help & Support</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find installation guides, troubleshooting tips, and answers to frequently asked questions
            </p>
          </div>

          {/* Main Navigation Tabs with Animation */}
          <Tabs defaultValue="installation" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <div className="flex justify-center py-[6px]">
              <TabsList aria-label="Support sections" className="bg-secondary/30 grid grid-cols-2 sm:grid-cols-4 w-full max-w-2xl relative">
                <TabsTrigger value="installation" className="data-[state=active]:bg-primary data-[state=active]:text-white flex items-center gap-1.5 px-2 py-2 h-auto whitespace-normal text-center">
                  <Download className="h-4 w-4 flex-shrink-0" />
                  <span className="text-xs sm:text-sm">Installation</span>
                </TabsTrigger>
                <TabsTrigger value="troubleshooting" className="data-[state=active]:bg-primary data-[state=active]:text-white flex items-center gap-1.5 px-2 py-2 h-auto whitespace-normal text-center">
                  <Info className="h-4 w-4 flex-shrink-0" />
                  <span className="text-xs sm:text-sm">Troubleshooting</span>
                </TabsTrigger>
                <TabsTrigger value="faq" className="data-[state=active]:bg-primary data-[state=active]:text-white flex items-center gap-1.5 px-2 py-2 h-auto whitespace-normal text-center">
                  <HelpCircle className="h-4 w-4 flex-shrink-0" />
                  <span className="text-xs sm:text-sm">FAQ</span>
                </TabsTrigger>
                <TabsTrigger value="contact" className="data-[state=active]:bg-primary data-[state=active]:text-white flex items-center gap-1.5 px-2 py-2 h-auto whitespace-normal text-center">
                  <MessageSquare className="h-4 w-4 flex-shrink-0" />
                  <span className="text-xs sm:text-sm">Contact</span>
                </TabsTrigger>
              </TabsList>
            </div>
            
            {/* Installation Guide */}
            <TabsContent value="installation" className="space-y-6 animate-fadeIn">
              <Card>
                <CardHeader>
                  <CardTitle>Installation Guide</CardTitle>
                  <CardDescription>
                    Follow these steps to install our mods and resource packs on your device
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue={activePlatform} onValueChange={setActivePlatform} className="space-y-6">
                    <div className="overflow-x-auto pb-2 scrollbar-thin touch-pan-x">
                      <TabsList className="bg-secondary/30 inline-flex whitespace-nowrap">
                        <TabsTrigger value="windows" className="data-[state=active]:border-b-2 data-[state=active]:border-primary">Windows</TabsTrigger>
                        <TabsTrigger value="android" className="data-[state=active]:border-b-2 data-[state=active]:border-primary">Android</TabsTrigger>
                        <TabsTrigger value="ios" className="data-[state=active]:border-b-2 data-[state=active]:border-primary">iOS</TabsTrigger>
                        <TabsTrigger value="console" className="data-[state=active]:border-b-2 data-[state=active]:border-primary">Console</TabsTrigger>
                      </TabsList>
                    </div>
                    
                    <TabsContent value="windows" className="space-y-4">
                      <div className="bg-secondary/10 rounded-md p-4">
                        <h3 className="text-xl font-semibold mb-3">Windows Installation</h3>
                        <ol className="space-y-4 list-decimal pl-5">
                          <li className="mb-2">
                            <div className="mb-1.5">
                              <p className="font-medium">Download the .mcaddon or .mcpack file</p>
                              <p className="text-muted-foreground text-sm">Click the download button on the project page.</p>
                            </div>
                            <div className="mt-1.5 text-sm flex items-center bg-primary/10 px-2 py-1.5 rounded w-full max-w-full">
                              <Download className="h-4.5 w-4.5 text-primary mr-1.5" />
                              <span>Download button is at the top of the project page</span>
                            </div>
                          </li>
                          <li className="mb-2">
                            <div>
                              <p className="font-medium">Double-click the downloaded file</p>
                              <p className="text-muted-foreground text-sm">This will automatically open Minecraft and begin the import process.</p>
                            </div>
                          </li>
                          <li className="mb-2">
                            <div>
                              <p className="font-medium">Wait for the import to complete</p>
                              <p className="text-muted-foreground text-sm">Minecraft will notify you when the import has finished.</p>
                            </div>
                          </li>
                          <li className="mb-2">
                            <div>
                              <p className="font-medium">Enable the mod in your world settings</p>
                              <p className="text-muted-foreground text-sm">Create a new world or edit an existing one, then enable the mod/resource pack in the world settings.</p>
                            </div>
                          </li>
                        </ol>
                      </div>
                      <div className="flex items-center justify-center mt-3">
                        <Button variant="outline" size="sm" asChild>
                          <a href="https://www.youtube.com/@redstonechickenmc" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-primary">
                              <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                              <path d="m10 15 5-3-5-3z" />
                            </svg>
                            <span>Watch Video Tutorial</span>
                          </a>
                        </Button>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="android" className="space-y-4">
                      {/* Android installation content similar to Windows but adapted for Android */}
                      <div className="bg-secondary/10 rounded-md p-4">
                        <h3 className="text-xl font-semibold mb-3">Android Installation</h3>
                        <ol className="space-y-4 list-decimal pl-5">
                          <li className="mb-2">
                            <div>
                              <p className="font-medium">Download the .mcaddon or .mcpack file</p>
                              <p className="text-muted-foreground text-sm">Tap the download button on the project page.</p>
                            </div>
                          </li>
                          <li className="mb-2">
                            <div>
                              <p className="font-medium">Open the file with Minecraft</p>
                              <p className="text-muted-foreground text-sm">When prompted, select Minecraft to open the file.</p>
                            </div>
                          </li>
                          <li className="mb-2">
                            <div>
                              <p className="font-medium">Wait for the import to complete</p>
                              <p className="text-muted-foreground text-sm">Minecraft will launch and import the content.</p>
                            </div>
                          </li>
                          <li className="mb-2">
                            <div>
                              <p className="font-medium">Enable the mod in your world settings</p>
                              <p className="text-muted-foreground text-sm">Create a new world or edit an existing one, then enable the mod/resource pack in the world settings.</p>
                            </div>
                          </li>
                        </ol>
                      </div>
                      <div className="flex items-center justify-center mt-3">
                        <Button variant="outline" size="sm" asChild>
                          <a href="https://www.youtube.com/@redstonechickenmc" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-primary">
                              <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                              <path d="m10 15 5-3-5-3z" />
                            </svg>
                            <span>Watch Video Tutorial</span>
                          </a>
                        </Button>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="ios" className="space-y-4">
                      {/* iOS content */}
                      <div className="bg-secondary/10 rounded-md p-4">
                        <h3 className="text-xl font-semibold mb-3">iOS Installation</h3>
                        <ol className="space-y-4 list-decimal pl-5">
                          <li className="mb-2">
                            <div>
                              <p className="font-medium">Download the .mcaddon or .mcpack file</p>
                              <p className="text-muted-foreground text-sm">Tap the download button on the project page.</p>
                            </div>
                          </li>
                          <li className="mb-2">
                            <div>
                              <p className="font-medium">Open in Minecraft</p>
                              <p className="text-muted-foreground text-sm">When the download completes, tap "Open in Minecraft".</p>
                            </div>
                          </li>
                          <li className="mb-2">
                            <div>
                              <p className="font-medium">Wait for the import to complete</p>
                              <p className="text-muted-foreground text-sm">Minecraft will launch and import the content.</p>
                            </div>
                          </li>
                          <li className="mb-2">
                            <div>
                              <p className="font-medium">Enable the mod in your world settings</p>
                              <p className="text-muted-foreground text-sm">Create a new world or edit an existing one, then enable the mod/resource pack in the world settings.</p>
                            </div>
                          </li>
                        </ol>
                      </div>
                      <div className="flex items-center justify-center mt-3">
                        <Button variant="outline" size="sm" asChild>
                          <a href="https://www.youtube.com/@redstonechickenmc" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-primary">
                              <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                              <path d="m10 15 5-3-5-3z" />
                            </svg>
                            <span>Watch Video Tutorial</span>
                          </a>
                        </Button>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="console" className="space-y-4">
                      {/* Console content */}
                      <div className="bg-secondary/10 rounded-md p-4">
                        <h3 className="text-xl font-semibold mb-3">Console Installation</h3>
                        <div className="mb-4 p-3 bg-primary/10 rounded-md text-sm">
                          <p className="font-medium mb-1">Important Note:</p>
                          <p>Console versions of Minecraft (Xbox, PlayStation, Switch) have limited support for custom content.</p>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="mb-3">
                            <h4 className="font-medium mb-1">Method 1: Using Minecraft Marketplace</h4>
                            <p className="text-muted-foreground text-sm">Some of our content may be available on the official Minecraft Marketplace. Check there for official releases.</p>
                          </div>
                          
                          <div className="mb-3">
                            <h4 className="font-medium mb-1">Method 2: Using Realms</h4>
                            <p className="text-muted-foreground text-sm">Join a Minecraft Realm that has the content installed. This requires someone with a non-console version to set up the Realm with the mod installed.</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-center mt-3">
                        <Button variant="outline" size="sm" asChild>
                          <a href="https://discord.gg/redstonechicken" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" className="text-indigo-400 mr-1.5">
                              <path fill="currentColor" d="M19.73 4.87a17.61 17.61 0 0 0-4.34-1.35c-.2.36-.38.72-.55 1.09a16.36 16.36 0 0 0-4.96 0c-.17-.37-.35-.73-.55-1.09-1.47.26-2.92.71-4.34 1.35-2.75 4.12-3.5 8.14-3.13 12.1a17.8 17.8 0 0 0 5.4 2.72c.44-.6.83-1.24 1.17-1.92-.64-.24-1.25-.54-1.84-.87.16-.11.3-.23.45-.35 3.44 1.57 7.15 1.57 10.55 0 .15.12.3.24.45.35-.58.34-1.2.63-1.84.88.34.68.73 1.32 1.17 1.92 1.87-.58 3.73-1.5 5.4-2.73.43-4.55-.73-8.52-3.13-12.1zM8.3 14.25c-1.06 0-1.92-.97-1.92-2.17 0-1.2.84-2.17 1.92-2.17 1.08 0 1.95.98 1.93 2.17 0 1.2-.84 2.17-1.93 2.17z" />
                            </svg>
                            Need Help? Join Our Discord
                          </a>
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Troubleshooting */}
            <TabsContent value="troubleshooting" className="space-y-6 animate-fadeIn">
              <Card>
                <CardHeader>
                  <CardTitle>Troubleshooting Guide</CardTitle>
                  <CardDescription>
                    Common issues and how to resolve them
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="text-base py-4 hover:bg-secondary/10 px-4 rounded-md">The mod doesn't appear in my world</AccordionTrigger>
                      <AccordionContent className="px-4 pb-4">
                        <div className="bg-secondary/10 p-4 rounded-md space-y-3">
                          <p className="font-medium">This is commonly caused by:</p>
                          <ul className="list-disc pl-6 space-y-2">
                            <li>The mod not being enabled in world settings</li>
                            <li>Incompatible Minecraft version</li>
                            <li>Conflicting mods</li>
                          </ul>
                          <p className="mt-2 font-medium">Solution:</p>
                          <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
                            <li>Check that the mod is enabled in world settings</li>
                            <li>Verify you're running the correct Minecraft version</li>
                            <li>Try creating a new world with only this mod enabled</li>
                          </ol>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-2">
                      <AccordionTrigger className="text-base py-4 hover:bg-secondary/10 px-4 rounded-md">Game crashes when loading the mod</AccordionTrigger>
                      <AccordionContent className="px-4 pb-4">
                        <div className="bg-secondary/10 p-4 rounded-md space-y-3">
                          <p className="font-medium">This is commonly caused by:</p>
                          <ul className="list-disc pl-6 space-y-2">
                            <li>Incompatible mod version</li>
                            <li>Conflict with other installed mods</li>
                            <li>Corrupted mod file</li>
                          </ul>
                          <p className="mt-2 font-medium">Solution:</p>
                          <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
                            <li>Re-download the mod to ensure the file isn't corrupted</li>
                            <li>Try removing other mods temporarily</li>
                            <li>Check for updates to both Minecraft and the mod</li>
                          </ol>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-3">
                      <AccordionTrigger className="text-base py-4 hover:bg-secondary/10 px-4 rounded-md">Textures or models appear incorrectly</AccordionTrigger>
                      <AccordionContent className="px-4 pb-4">
                        <div className="bg-secondary/10 p-4 rounded-md space-y-3">
                          <p className="font-medium">This is commonly caused by:</p>
                          <ul className="list-disc pl-6 space-y-2">
                            <li>Resource pack conflicts</li>
                            <li>Missing dependencies</li>
                            <li>Graphics settings too low</li>
                          </ul>
                          <p className="mt-2 font-medium">Solution:</p>
                          <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
                            <li>Disable other resource packs</li>
                            <li>Check if the mod requires a companion resource pack</li>
                            <li>Increase your graphics settings in Minecraft</li>
                          </ol>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-4">
                      <AccordionTrigger className="text-base py-4 hover:bg-secondary/10 px-4 rounded-md">Cannot import mod on mobile devices</AccordionTrigger>
                      <AccordionContent className="px-4 pb-4">
                        <div className="bg-secondary/10 p-4 rounded-md space-y-3">
                          <p className="font-medium">This is commonly caused by:</p>
                          <ul className="list-disc pl-6 space-y-2">
                            <li>File association issues</li>
                            <li>Download manager problems</li>
                            <li>Storage permission issues</li>
                          </ul>
                          <p className="mt-2 font-medium">Solution:</p>
                          <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
                            <li>Ensure your device has enough storage space</li>
                            <li>Check that Minecraft has permission to access your storage</li>
                            <li>Try downloading using a different browser</li>
                            <li>If using iOS, ensure you're using the "Open in Minecraft" option</li>
                          </ol>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* FAQ */}
            <TabsContent value="faq" className="space-y-6 animate-fadeIn">
              <Card>
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                  <CardDescription>
                    Quick answers to common questions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="faq-1">
                      <AccordionTrigger className="text-base py-4 hover:bg-secondary/10 px-4 rounded-md">Are your mods free to use?</AccordionTrigger>
                      <AccordionContent className="px-4 pb-4">
                        <div className="bg-secondary/10 p-4 rounded-md">
                          Yes, all of our mods and resource packs are free to download and use. We do appreciate support through our YouTube channel and community engagement.
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="faq-2">
                      <AccordionTrigger className="text-base py-4 hover:bg-secondary/10 px-4 rounded-md">Can I use your mods in my videos?</AccordionTrigger>
                      <AccordionContent className="px-4 pb-4">
                        <div className="bg-secondary/10 p-4 rounded-md">
                          Absolutely! You're welcome to create videos featuring our mods. We only ask that you credit "Redstone Chicken" and include a link to either our website or YouTube channel in your video description.
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="faq-3">
                      <AccordionTrigger className="text-base py-4 hover:bg-secondary/10 px-4 rounded-md">Do your mods work in multiplayer?</AccordionTrigger>
                      <AccordionContent className="px-4 pb-4">
                        <div className="bg-secondary/10 p-4 rounded-md">
                          Yes, most of our mods work in multiplayer as long as all players have the mod installed. For Realms or servers, the mod needs to be installed on the server/Realm as well.
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="faq-4">
                      <AccordionTrigger className="text-base py-4 hover:bg-secondary/10 px-4 rounded-md">How often do you update your mods?</AccordionTrigger>
                      <AccordionContent className="px-4 pb-4">
                        <div className="bg-secondary/10 p-4 rounded-md">
                          We strive to update our mods for major Minecraft updates. For popular mods, we also release feature updates and bug fixes more regularly. Check the mod's page for its update status.
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="faq-5">
                      <AccordionTrigger className="text-base py-4 hover:bg-secondary/10 px-4 rounded-md">Can I suggest new features?</AccordionTrigger>
                      <AccordionContent className="px-4 pb-4">
                        <div className="bg-secondary/10 p-4 rounded-md">
                          We welcome feature suggestions! The best place to share your ideas is on our Discord server where we have dedicated channels for suggestions and discussions.
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="faq-6">
                      <AccordionTrigger className="text-base py-4 hover:bg-secondary/10 px-4 rounded-md">Will you make mods for other games?</AccordionTrigger>
                      <AccordionContent className="px-4 pb-4">
                        <div className="bg-secondary/10 p-4 rounded-md">
                          Currently, we're focused exclusively on Minecraft content. While we may explore other games in the future, we have no immediate plans to expand beyond Minecraft.
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  
                  <div className="mt-8 p-4 border border-primary/20 rounded-lg bg-primary/5">
                    <p className="text-center mb-4">Have a question that's not answered here?</p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                      <Button asChild variant="outline" size="sm">
                        <a href="https://discord.gg/redstonechicken" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 12a4 4 0 0 0 4 4 4 4 0 0 0-4-8 4 4 0 0 0 0 4Z" />
                            <path d="M18 9.5c.5 1.5 .5 4.5 0 6-4 2-8.5 2-12.5 0" />
                            <path d="M18 9.5c-4-2-8.5-2-12.5 0" />
                            <path d="M2 17.5C.5 16 .5 8 2 6.5 6 3.5 18 3.5 22 6.5c1.5 1.5 1.5 9.5 0 11-4 3-16 3-20 0Z" />
                          </svg>
                          Join Discord
                        </a>
                      </Button>
                      
                      <Button variant="outline" size="sm" onClick={() => setActiveTab("contact")}>
                        <MessageSquare className="h-4 w-4 mr-1.5" />
                        Contact Us
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Contact Form */}
            <TabsContent value="contact" className="space-y-6 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Form</CardTitle>
                    <CardDescription>
                      Send us a message and we'll get back to you
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="name" className="text-sm font-medium block mb-1">
                          Name
                        </label>
                        <Input id="name" name="name" value={formData.name} onChange={handleChange} required placeholder="Your name" aria-required="true" />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="text-sm font-medium block mb-1">
                          Email
                        </label>
                        <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="Your email" aria-required="true" />
                      </div>
                      
                      <div>
                        <label htmlFor="subject" className="text-sm font-medium block mb-1">
                          Subject
                        </label>
                        <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} required placeholder="Message subject" aria-required="true" />
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="text-sm font-medium block mb-1">
                          Message
                        </label>
                        <Textarea id="message" name="message" value={formData.message} onChange={handleChange} required placeholder="Your message" className="min-h-[120px]" aria-required="true" />
                      </div>
                      
                      <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Other Ways to Reach Us</CardTitle>
                    <CardDescription>
                      Connect with us on various platforms
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <a href="https://discord.gg/redstonechicken" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-secondary/20 rounded-lg hover:bg-secondary/40 transition-colors">
                        <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 12a4 4 0 0 0 4 4 4 4 0 0 0-4-8 4 4 0 0 0 0 4Z" />
                            <path d="M18 9.5c.5 1.5 .5 4.5 0 6-4 2-8.5 2-12.5 0" />
                            <path d="M18 9.5c-4-2-8.5-2-12.5 0" />
                            <path d="M2 17.5C.5 16 .5 8 2 6.5 6 3.5 18 3.5 22 6.5c1.5 1.5 1.5 9.5 0 11-4 3-16 3-20 0Z" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-medium">Discord</div>
                          <div className="text-sm text-muted-foreground">Join our community server</div>
                        </div>
                        <ExternalLink className="h-4 w-4 ml-auto text-muted-foreground" />
                      </a>
                      
                      <a href="https://www.youtube.com/@redstonechickenmc" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-secondary/20 rounded-lg hover:bg-secondary/40 transition-colors">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                          <Youtube className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">YouTube</div>
                          <div className="text-sm text-muted-foreground">Watch tutorials and updates</div>
                        </div>
                        <ExternalLink className="h-4 w-4 ml-auto text-muted-foreground" />
                      </a>
                      
                      <a href="mailto:contact@redstonechicken.com" className="flex items-center gap-3 p-3 bg-secondary/20 rounded-lg hover:bg-secondary/40 transition-colors">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect width="20" height="16" x="2" y="4" rx="2" />
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-medium">Email</div>
                          <div className="text-sm text-muted-foreground">contact@redstonechicken.com</div>
                        </div>
                      </a>
                    </div>
                    
                    <div className="p-4 bg-secondary/20 rounded-lg border border-border/50">
                      <h3 className="text-sm font-medium mb-2">Business Hours</h3>
                      <p className="text-sm text-muted-foreground">
                        We typically respond to inquiries within 48 hours. For urgent issues, please use our Discord server.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Join Community Section - Copied from Home.tsx */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-left text-3xl md:text-4xl font-bold mb-8 text-foreground">
              Join Our <span className="text-primary relative">
                Community
                <div className="absolute inset-0 text-primary blur-lg opacity-30"></div>
              </span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <a href="https://discord.gg/redstonechicken" target="_blank" rel="noopener noreferrer" 
                className="group p-6 rounded-xl flex flex-col sm:flex-row items-center gap-4 bg-background/10 backdrop-blur-md border border-border/20 hover:border-indigo-500/40 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-indigo-500/10 relative overflow-hidden">
                
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-transparent to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="w-12 h-12 bg-indigo-500/20 rounded-full flex items-center justify-center relative backdrop-blur-sm border border-indigo-500/30 group-hover:border-indigo-500/60 transition-colors duration-300 flex-shrink-0">
                  <MessageCircle className="h-6 w-6 text-indigo-400 group-hover:text-indigo-300 transition-colors duration-300" />
                  <div className="absolute inset-0 rounded-full bg-indigo-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <div className="flex-1 text-center sm:text-left relative z-10">
                  <h3 className="text-lg font-semibold font-montserrat group-hover:text-indigo-300 transition-colors duration-300">Discord Server</h3>
                  <p className="text-sm font-montserrat text-muted-foreground group-hover:text-muted-foreground/80 transition-colors duration-300">
                    Join our Discord for <span className="text-gradient-red">support</span>, updates, and chat with other players
                  </p>
                </div>
                
                <Button size="sm" variant="outline" className="font-montserrat relative z-10 bg-background/20 backdrop-blur-sm border-indigo-500/30 hover:border-indigo-500/60 hover:bg-indigo-500/10 hover:text-indigo-300 flex-shrink-0">
                  Join
                </Button>
              </a>
              
              <a href="https://www.youtube.com/@redstonechickenmc" target="_blank" rel="noopener noreferrer"
                className="group p-6 rounded-xl flex flex-col sm:flex-row items-center gap-4 bg-background/10 backdrop-blur-md border border-border/20 hover:border-primary/40 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/10 relative overflow-hidden">
                
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center relative backdrop-blur-sm border border-primary/30 group-hover:border-primary/60 transition-colors duration-300 flex-shrink-0">
                  <Youtube className="h-6 w-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute inset-0 rounded-full bg-primary/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <div className="flex-1 text-center sm:text-left relative z-10">
                  <h3 className="text-lg font-semibold font-montserrat group-hover:text-primary transition-colors duration-300">YouTube Channel</h3>
                  <p className="text-sm font-montserrat text-muted-foreground group-hover:text-muted-foreground/80 transition-colors duration-300">
                    Watch <span className="text-gradient-red">tutorials</span>, showcases, and updates about our mods
                  </p>
                </div>
                
                <Button size="sm" variant="outline" className="font-montserrat relative z-10 bg-background/20 backdrop-blur-sm border-primary/30 hover:border-primary/60 hover:bg-primary/10 hover:text-primary flex-shrink-0">
                  Subscribe
                </Button>
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>;
};

export default Support;
