interface DownloadsHeroProps {}

const DownloadsHero = ({}: DownloadsHeroProps) => {
  return (
    <div className="relative pt-16 pb-8 md:pt-20 md:pb-10 px-4 text-center">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-montserrat text-foreground">
          Downloads
        </h1>
        <p className="text-lg md:text-xl font-montserrat text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Explore our collection of <span className="text-gradient-red font-semibold">Minecraft Bedrock addons</span> and texture packs. 
          Find the perfect <span className="text-gradient-red font-semibold">enhancement</span> for your world.
        </p>
      </div>
    </div>
  );
};

export default DownloadsHero;
