<?php
/**
 * This file is part of JKN
 *
 * (c) Muhamad Surya Iksanudin<surya.kejawen@gmail.com>
 *
 * @author : Muhamad Surya Iksanudin
 **/
namespace AppBundle\Form;

use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;
use Ihsan\MalesBundle\Form\AbstractType;

class BlockType extends AbstractType
{
    const FORM_NAME = 'block';

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('block_id', 'text', array(
                'label' => 'form.label.block',
            ))
            ->add('chart', 'text', array(
                'label' => 'form.label.chart',
            ))
            ->add('indikator', 'entity', array(
                'class' => 'AppBundle\\Entity\\Indikator',
                'property' => 'name',
                'empty_value' => 'form.select.empty',
                'label' => 'form.label.indikator',
                'required' => false,
            ))
        ;
    }

    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => $this->guesser->getEntityClass(),
            'translation_domain' => $this->guesser->getBundleAlias(),
            'intention'  => self::FORM_NAME,
        ));
    }

    public function getName()
    {
        return self::FORM_NAME;
    }
} 