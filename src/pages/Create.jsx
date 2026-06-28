import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { ProgressDots } from '../components/ProgressDots';
import { NameSection } from '../components/NameSection';
import { VibeSection } from '../components/VibeSection';
import { CategorySection } from '../components/CategorySection';
import { ProductPicker } from '../components/ProductPicker';
import { DeployBar } from '../components/DeployBar';
import { Toast } from '../components/Toast';
import { useDropState } from '../hooks/useDropState';
import { useToast } from '../hooks/useToast';
import { MOCK_PRODUCTS } from '../data/mockProducts';
import { deployDrop } from '../lib/supabase';

export function Create() {
  const drop = useDropState();
  const { toast, show: showToast } = useToast();
  const [xp, setXp] = useState(640);
  const navigate = useNavigate();

  const gainXP = (n) => {
    setXp(prev => prev + n);
    showToast(`+${n} XP`);
  };

  const { total, earn } = useMemo(() => {
    const t = drop.selected.reduce((sum, id) => {
      const p = MOCK_PRODUCTS.find(x => x.id === id);
      return sum + (p ? p.price : 0);
    }, 0);
    return { total: t, earn: Math.round(t * drop.COMMISSION_RATE) };
  }, [drop.selected]);

  const handleToggleProduct = (id) => {
    const wasAdded = drop.selected.includes(id);
    drop.toggleProduct(id);
    if (!wasAdded && drop.selected.length < drop.MAX_PRODUCTS) {
      gainXP(10);
      if (drop.selected.length + 1 === drop.MIN_PRODUCTS) {
        setTimeout(() => {
          showToast('deploy ready · +50 bonus', true);
          setXp(prev => prev + 50);
        }, 700);
      }
    } else if (wasAdded) {
      showToast('removed');
    }
  };

  const handleToggleVibe = (label) => {
    const wasOn = drop.vibes.includes(label);
    drop.toggleVibe(label, 3);
    if (!wasOn) gainXP(5);
  };

  const handleCategory = (slug) => {
    drop.setCategory(slug);
    gainXP(15);
  };

  const buttonLabel = useMemo(() => {
    if (drop.isReady) return 'send it';
    if (!drop.name.trim()) return 'name it';
    if (!drop.category) return 'pick category';
    if (drop.selected.length < drop.MIN_PRODUCTS) {
      return `add ${drop.MIN_PRODUCTS - drop.selected.length} more`;
    }
    return 'send it';
  }, [drop.isReady, drop.name, drop.category, drop.selected]);

  const handleDeploy = async () => {
    if (!drop.isReady) return;
    try {
      const payload = {
        name: drop.name,
        pitch: drop.pitch,
        vibes: drop.vibes,
        category: drop.category,
        product_ids: drop.selected,
      };
      await deployDrop(payload);
      showToast('drop deployed · +250 XP', true);
      setXp(prev => prev + 250);
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err) {
      console.error(err);
      showToast('deploy failed', true);
    }
  };

  return (
    <>
      <div className="page-container">
        <Hero dropNumber="048" />
        <ProgressDots progress={drop.progress} />

        <NameSection
          name={drop.name}
          pitch={drop.pitch}
          onNameChange={drop.setName}
          onPitchChange={drop.setPitch}
        />
        <VibeSection
          selectedVibes={drop.vibes}
          onToggle={handleToggleVibe}
          onMaxHit={() => showToast('max 3 vibes')}
        />
        <CategorySection
          selected={drop.category}
          onSelect={handleCategory}
        />
        <ProductPicker
          selectedIds={drop.selected}
          onToggle={handleToggleProduct}
          onMaxHit={() => showToast(`max ${drop.MAX_PRODUCTS}!`)}
          maxProducts={drop.MAX_PRODUCTS}
          minProducts={drop.MIN_PRODUCTS}
          categoryFilter={drop.category || 'all'}
        />
      </div>

      <DeployBar
        count={drop.selected.length}
        total={total}
        earn={earn}
        ready={drop.isReady}
        buttonLabel={buttonLabel}
        onDeploy={handleDeploy}
      />

      <Toast text={toast.text} visible={toast.visible} />
    </>
  );
}
